# nodejs-job-portal-413

# user

- register
  - post
  - https://nodejs-job-portal-413.onrender.com/api/v1/auth/register
  - name,email,password required
- login
  - post with jwt token 
    - https://nodejs-job-portal-413.onrender.com/api/v1/auth/login
    - email,password
- update
  - put with jwt token 
  - https://nodejs-job-portal-413.onrender.com/api/v1/user/update-user
  - name,lastname,email,location
    
# jobs
  - create job
    - post with user jwt token -https://nodejs-job-portal-413.onrender.com/api/v1/job/create-job
    - company,position is required
  - get jobs
    - get with user jwt token 
    - https://nodejs-job-portal-413.onrender.com/api/v1/job/get-jobs?sort=z-a&page=1&limit=20
    - you can user params such as search,status,worktype,sort,page,limit
  - update job
    - patch with user jwt token 
    - https://nodejs-job-portal-413.onrender.com/api/v1/job/update-jobs/662d1fe07bbd649d1879a586
  - delete job
    - delete with user jwt token 
    - https://nodejs-job-portal-413.onrender.com/api/v1/job/delete-jobs/662d1fe07bbd649d1879a586
  - job stats
    - get with user jwt token 
    - https://nodejs-job-portal-413.onrender.com/api/v1/job/job-stats
