## What I found

`snaprint.tn` and `www.snaprint.tn` are currently served by **Vercel**, while `snaprint.lovable.app` is served by Lovable. That means the working Lovable publish is not what visitors see on `snaprint.tn`.

GitHub sync being active only means Lovable can push the latest code to GitHub. Your custom domain still depends on what Vercel has deployed and which environment variables are configured there.

## Plan

1. **Confirm the Vercel deployment source**
   - Check the GitHub repository connected to Vercel.
   - Confirm it is the same repo Lovable is syncing to.
   - If it is not the same repo, reconnect Vercel to the Lovable-synced repo or update the existing Vercel repo manually.

2. **Redeploy Vercel from the latest synced commit**
   - In Vercel, open the Snaprint project.
   - Go to **Deployments**.
   - Trigger a fresh production redeploy after GitHub sync has completed.

3. **Add the required server environment variables in Vercel**
   - Add these to **Production** and ideally **Preview** environments:
     - `SNAPRINT_SUPABASE_URL`
     - `SNAPRINT_SUPABASE_SERVICE_ROLE_KEY`
     - `RESEND_API_KEY`
   - These must match the values used by the working Lovable deployment.

4. **Redeploy again after adding env vars**
   - Vercel does not automatically apply new environment variables to old deployments.
   - After saving them, redeploy the latest production deployment.

5. **Test the real production domain**
   - Submit the contact form on `https://snaprint.tn`.
   - Confirm the submission is saved and the email reaches `snaprint.tn@gmail.com`.

## No code changes needed right now

The contact form code is already working on `snaprint.lovable.app`, so this is not a form-code bug. It is a hosting/deployment mismatch: `snaprint.tn` is still going through Vercel, and Vercel needs the latest synced code plus the same runtime secrets.