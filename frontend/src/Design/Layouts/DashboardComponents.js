import React from "react";
import TopBar from "./TopBar";
import clapIcon from "../Assets/clapIcon.png";
import icon1 from "../Assets/icon1.png";
import icon2 from "../Assets/icon2.png";
import icon3 from "../Assets/icon3.png";
import call from "../Assets/call.png";
import video from "../Assets/video.png";
import customer from "../Assets/customer.png";

export default function DashboardComponents() {
  const [t, setT] = React.useState("Hi");
  const [events, setEvents] = React.useState([
    {
      taskName: "Demo Meeting with customer Name",
      media: "call",
      time: "02.30pm",
    },
    {
      taskName: "Demo Meeting with customer Name",
      media: "video",
      time: "03.30pm",
    },
  ]);
  const [calls, setCalls] = React.useState([
    {
      name: "Customer Name1",
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    },
    {
      name: "Customer Name2",
      des: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's ",
    },
  ]);
  React.useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setT("Good Mrning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setT("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 20) {
      setT("Good Evening");
    } else {
      setT("Good Night");
    }
  }, []);
  const data = {
    calls: 120,
    lastCalls: 100,
    leads: 12,
    lastLeads: 10,
    meetings: 16,
    lastMeetings: 14,
  };
  return (
    <div>
      <TopBar />
      <div className="right-contnet">
        <div className="right-content-inner">
          <div className="welcome-note">
            <div className="d-flex">
              <img src={clapIcon} alt="clap icon dshboard" />
              <div>
                <h1>{t}, Shenelle</h1>
                <p>Welcome back to your dashboard</p>
              </div>
            </div>
          </div>
          <div className="dashboard-data-show">
            <div>
              <h4>Total Leads</h4>
              <div
                className="single-data-view"
                style={{ background: "#ff0090" }}
              >
                <div>
                  <img src={icon1} alt="icon1" />
                </div>
                <div>
                  <h3>{data.leads}</h3>
                  <p>Last Week : {data.lastLeads}</p>
                </div>
              </div>
            </div>
            <div>
              <h4>Your Calls Today</h4>
              <div
                className="single-data-view"
                style={{ background: "#00c0ff" }}
              >
                <div>
                  <img src={icon2} alt="icon1" />
                </div>
                <div>
                  <h3>{data.calls}</h3>
                  <p>Last Week : {data.lastCalls}</p>
                </div>
              </div>
            </div>
            <div>
              <h4>Your Meeting Today</h4>
              <div
                className="single-data-view"
                style={{ background: "#3eff8b" }}
              >
                <div>
                  <img src={icon3} alt="icon1" />
                </div>
                <div>
                  <h3>{data.meetings}</h3>
                  <p>Last Week : {data.lastMeetings}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div>
              <h4>Today Upcoming Tasks</h4>
              <div className="tasks">
                <div className="upcoming-events">
                  {events.map((val, key) => (
                    <div key={key} className="single-task">
                      {"call" === val.media && (
                        <img src={call} alt="event icon" />
                      )}
                      {"video" === val.media && (
                        <img src={video} alt="event icon" />
                      )}
                      <div className="d-between">
                        <div>
                          <h3>{val.taskName}</h3>
                          <p>Time : {val.time}</p>
                        </div>
                        <div>
                          {"call" === val.media && (
                            <button style={{ background: "#00c0ff" }}>
                              User Details
                            </button>
                          )}
                          {"video" === val.media && (
                            <button style={{ background: "#00ff72" }}>
                              User Details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h4 style={{ marginLeft: "5vw" }}>Latest Calls</h4>
              <div className="calls">
                <div className="made-calls">
                  {calls.map((val, key) => (
                    <div key={key} className="single-call">
                      <img src={customer} alt="customer icon" />
                      <div>
                        <h3>{val.name}</h3>
                        <p>See More</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
