from multiprocessing import cpu_count



# Socket Path

bind = 'unix:/home/sahil/fastapi_demo/gunicorn.sock'



# Worker Options

workers = cpu_count() + 1

worker_class = 'uvicorn.workers.UvicornWorker'

timeout = 600

# Logging Options

loglevel = 'debug'

accesslog = '/home/sahil/fastapi_demo/access_log'

errorlog =  '/home/sahil/fastapi_demo/error_log'