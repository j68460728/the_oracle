import logging
import sys
from pythonjsonlogger import jsonlogger
from app.config import settings

def setup_logging():
    logger = logging.getLogger()
    
    if settings.ENVIRONMENT == "development":
        logger.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    else:
        logger.setLevel(logging.INFO)
        formatter = jsonlogger.JsonFormatter('%(asctime)s %(levelname)s %(name)s %(message)s')

    # Remove existing handlers
    while logger.hasHandlers():
        logger.removeHandler(logger.handlers[0])

    logHandler = logging.StreamHandler(sys.stdout)
    logHandler.setFormatter(formatter)
    logger.addHandler(logHandler)
    
    # Disable uvicorn access logs to prevent duplication
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
