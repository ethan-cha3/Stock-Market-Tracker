import yfinance as yf

def main():
    dat = yf.Ticker("MSFT")
    print(dat.info['currentPrice'])
    return

main()