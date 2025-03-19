import json
import boto3
import yfinance as yf
from datetime import datetime

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('StockWatchList')

def lambda_handler(event, context):
    # TODO implement
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
