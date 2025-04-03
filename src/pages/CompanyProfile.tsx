import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCompanyProfile } from "../services/api.ts";
import "../css/CompanyProfile.css";

const CompanyProfile = () => {
  const { stockSymbol } = useParams<{ stockSymbol: string }>();
  const symbol = stockSymbol ?? "unknown";
  const [companyInfo, setCompanyInfo] = useState<{
    [key: string]: {
      country: string;
      currency: string;
      exchange: string;
      industry: string;
      ipo: string;
      logo: string;
      marketcap: number;
      name: string;
      phone: string;
      shareoutstanding: number;
      ticker: string;
      weburl: string;
    };
  }>({});

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      const profile: {
        [key: string]: {
          country: string;
          currency: string;
          exchange: string;
          industry: string;
          ipo: string;
          logo: string;
          marketcap: number;
          name: string;
          phone: string;
          shareoutstanding: number;
          ticker: string;
          weburl: string;
        };
      } = {};
      try {
        const data = await getCompanyProfile(symbol);
        profile[symbol] = {
          country: data.country,
          currency: data.currency,
          exchange: data.exchange,
          industry: data.finnhubIndustry,
          ipo: data.ipo,
          logo: data.logo,
          marketcap: data.marketCapitalization,
          name: data.name,
          phone: data.phone,
          shareoutstanding: data.shareOutstanding,
          ticker: data.ticker,
          weburl: data.weburl,
        };
      } catch (error) {
        console.error("Error getting company profile:", error);
        profile[symbol] = {
          country: "",
          currency: "",
          exchange: "",
          industry: "",
          ipo: "",
          logo: "",
          marketcap: 0,
          name: "",
          phone: "",
          shareoutstanding: 0,
          ticker: "",
          weburl: "",
        };
      }
      setCompanyInfo(profile);
    };
    fetchCompanyProfile();
  }, [symbol]);

  return (
    companyInfo[symbol] && (
      <div className="company-body">
        <h2>{companyInfo[symbol].name}</h2>
        <img
          src={companyInfo[symbol].logo}
          alt={`${companyInfo[symbol].name} logo`}
          width={100}
        />
        <table>
          <tbody>
            <tr>
              <td>
                <strong>Ticker:</strong>
              </td>
              <td>{companyInfo[symbol].ticker}</td>
            </tr>
            <tr>
              <td>
                <strong>Country:</strong>
              </td>
              <td>{companyInfo[symbol].country}</td>
            </tr>
            <tr>
              <td>
                <strong>Currency:</strong>
              </td>
              <td>{companyInfo[symbol].currency}</td>
            </tr>
            <tr>
              <td>
                <strong>Exchange:</strong>
              </td>
              <td>{companyInfo[symbol].exchange}</td>
            </tr>
            <tr>
              <td>
                <strong>Industry:</strong>
              </td>
              <td>{companyInfo[symbol].industry}</td>
            </tr>
            <tr>
              <td>
                <strong>IPO:</strong>
              </td>
              <td>{companyInfo[symbol].ipo}</td>
            </tr>
            <tr>
              <td>
                <strong>Market Cap:</strong>
              </td>
              <td>{companyInfo[symbol].marketcap.toLocaleString()}</td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
              </td>
              <td>{companyInfo[symbol].phone}</td>
            </tr>
            <tr>
              <td>
                <strong>Shares Outstanding:</strong>
              </td>
              <td>{companyInfo[symbol].shareoutstanding.toLocaleString()}</td>
            </tr>
            <tr>
              <td>
                <strong>Website:</strong>
              </td>
              <td>
                <a
                  href={companyInfo[symbol].weburl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {companyInfo[symbol].weburl}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  );
};

export default CompanyProfile;
