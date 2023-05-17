# Blog

It includes demostration of how microservices works. Microservices architecture exists to remove the dependencies among the features of the application, for instead of having the full feature working api we can spirit the api features into small independent services. Taking example for the blog, instead of having all the blog features such commenting, posting a blog, moduration of the comments, into one api we can split each feature into independent api and this provide the advantages that each feature failing the independently for example feature of the posting a post can go down but while posting comments to existing working.

## services

we have posts, comments, event bus, moduration and query service to fetch posts along with the comments.
The kubernetes is used for orchastrating the containers for each services and also provide load balancing among the services.

- To run blog project you can use skaffold which make dealing with the kubernetes much more very easier
  you only need only to run `skaffold dev`
  Some of important kubernets command
  - `kubectl get [pods, service, deploy(deployment), nodes` for getting the objects in kubernetes
  - `kubectl delete [pods, service, deploy(deployment), nodes] [object name]` for deleting the objects in
  - `kubectl rollout restart  deploy [deployment name]` for rebuilding the container
- '/etc/hosts' remeber to the set blog.local to point to the localhost
