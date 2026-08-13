import { loadEnv } from 'vite';

export function googleReviewsPlugin() {
  let cache = { data: null, timestamp: 0 };
  const CACHE_DURATION = 60 * 60 * 1000; // 1 hour cache duration according to API terms

  return {
    name: 'google-reviews-api',
    configureServer(server) {
      server.middlewares.use('/api/google-reviews', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');

        const env = loadEnv(server.config.mode || 'development', process.cwd(), '');
        const apiKey = env.GOOGLE_PLACES_API_KEY || env.VITE_GOOGLE_PLACES_API_KEY || process.env.GOOGLE_PLACES_API_KEY;
        const placeId = env.GOOGLE_PLACE_ID || env.VITE_GOOGLE_PLACE_ID || process.env.GOOGLE_PLACE_ID || 'ChIJQYjDSBfI5zsRlTb0Tx3Nbl0';

        if (!apiKey || apiKey.trim() === '' || apiKey.includes('YOUR_')) {
          res.statusCode = 200;
          return res.end(
            JSON.stringify({
              success: false,
              error: 'GOOGLE_PLACES_API_KEY is not configured in .env',
              code: 'NO_API_KEY',
              placeId
            })
          );
        }

        // Return cached data if fresh
        if (cache.data && Date.now() - cache.timestamp < CACHE_DURATION) {
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, source: 'cache', ...cache.data }));
        }

        try {
          const googleUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${encodeURIComponent(
            placeId
          )}&fields=name,rating,user_ratings_total,reviews,url&key=${encodeURIComponent(apiKey)}`;

          const response = await fetch(googleUrl);
          const data = await response.json();

          if (data.status === 'OK' && data.result) {
            const result = {
              name: data.result.name,
              rating: data.result.rating || 0,
              userRatingCount: data.result.user_ratings_total || 0,
              googleMapsUrl: data.result.url || '',
              reviews: (data.result.reviews || []).map((r) => ({
                id: `google-${r.time}-${r.author_name}`,
                author: r.author_name,
                authorPhoto: r.profile_photo_url,
                authorUrl: r.author_url,
                rating: r.rating,
                comment: r.text,
                date: r.relative_time_description,
                timestamp: r.time ? r.time * 1000 : Date.now(),
                isGoogleReview: true
              }))
            };

            cache = { data: result, timestamp: Date.now() };
            res.statusCode = 200;
            return res.end(JSON.stringify({ success: true, source: 'live', ...result }));
          } else {
            res.statusCode = 200;
            return res.end(
              JSON.stringify({
                success: false,
                error: data.error_message || `Google Places API returned status: ${data.status}`,
                code: data.status,
                placeId
              })
            );
          }
        } catch (err) {
          res.statusCode = 500;
          return res.end(
            JSON.stringify({
              success: false,
              error: err.message || 'Failed to contact Google Places API',
              code: 'FETCH_ERROR'
            })
          );
        }
      });
    }
  };
}
