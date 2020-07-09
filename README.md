# cloud-function-latency-spikes
Using child_process to run code inside a Cloud Function seems to produce significant latency spikes around require statements.

## Details

Check out this blog post for [details and stats](https://asserted.io/posts/spikes-in-cloud-function-require-latency). 
