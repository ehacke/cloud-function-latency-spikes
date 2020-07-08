# cloud-run-vs-cloud-functions-processes
How child processes are handled in Cloud Run compared to Cloud Functions

## Status

At this point I can reproduce the issue with Cloud Functions sporadically running slower. Seems to be most obvious 
when running Mocha inside a thread on a 512MB function. But can't figure out why.

Seems likely that it's happening between the moment that the Cloud Function first invokes Mocha, and after all the 
first batch of requires fire.

Maybe some kind of system-level issue with reading from disk? I dunno. 
