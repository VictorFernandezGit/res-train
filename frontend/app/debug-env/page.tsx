export default function DebugEnvPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="space-y-2">
        <div>
          <strong>DATABASE_URL:</strong> {process.env.DATABASE_URL ? "✅ Set" : "❌ Missing"}
        </div>
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
        </div>
        <div>
          <strong>SUPABASE_SERVICE_ROLE_KEY:</strong> {process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "❌ Missing"}
        </div>
        <div>
          <strong>NEXT_PUBLIC_SUPABASE_ANON_KEY:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Environment File Location</h2>
        <p>Make sure your .env.local file is in the <code>frontend</code> directory, not the root.</p>
        <p>Current working directory should be: <code>/Users/vicviper/Desktop/res-train/frontend</code></p>
      </div>
    </div>
  )
} 