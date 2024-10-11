from datetime import timedelta

#
G_MIDDLE_DOT = " • "
G_RUPEE_SYMBOL = "₹ "

G_SELECT_INDIA_COUNTRY = {
    "key": "C001",
    "label": "INDIA",
}

G_ACCESS_EXPIRES = timedelta(minutes=50000000)
G_REFRESH_EXPIRES = timedelta(days=30)
G_TIME_DIFFERENCE_IST_SECONDS = 19800  # 5 hrs 30 mins in seconds
G_ONE_DAY_IN_SECONDS = 86400

G_DATE_FORMAT = "%d/%m/%Y"


commonError = {
    "status": 0,
    "class": "error",
    "message": "Error",
    "payload": {},
}
G_SCHEDULE_TYPE = ["scheduleOn", "scheduleNow"]
