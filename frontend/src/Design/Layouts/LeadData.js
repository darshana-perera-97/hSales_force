import React from "react";
import TopBar from "./TopBar";
import customer from "../Assets/customer.png";
import call from "../Assets/call2.png";
import skype from "../Assets/skype.png";
import whtsap from "../Assets/whtsap.png";
import add from "../Assets/add.png";
import zoom from "../Assets/zoom.png";
import checkIcon from "../Assets/correctIcon.png";
import notes from "../Assets/notesIcon.png";

export default function LeadData() {
  const [personData, setPersonData] = React.useState({
    name: "Customer Full Name",
    title: "Customer Title",
    company: "Company Name",
    phone: "+94 77 12 34 567",
    email: "test@abc.com",
    location: "Location 1,Location",
  });
  const nextTask = {
    medum: "zoom",
    title: "Demo meeting with Client Name",
    time: "2023-08-04 05.00 PM",
  };
  const [webScrtape, setWebscrape] = React.useState(
    "Text is loading soon. Please wait"
  );
  const [notes, setNotes] = React.useState([
    {
      user: "user 01",
      title: "Title gores here",
      content: "The note content goes here",
    },
  ]);
  const [history, setHistory] = React.useState([
    {
      month: "July",
      date: "24",
      year: "2023",
      title: "initial call",
      summery: "The call summery will be here",
      caller: "User 01",
    },
  ]);
  return (
    <div>
      <TopBar />
      <div className="right-contnet">
        <div className="right-content-inner">
          <div className="customer-details ">
            <div className="d-flex">
              <img src={customer} alt="customer image" />
              <div>
                <h2>{personData.name}</h2>
                <h4>{personData.title}</h4>
                <hr />
                <div className="userData-set">
                  <div className="userData">
                    <p>
                      <b>Company : </b>
                      {personData.company}
                    </p>
                    <p>
                      <b>Email : </b>
                      {personData.email}
                    </p>
                  </div>
                  <div className="userData">
                    <p>
                      <b>Phone Number : </b>
                      {personData.phone}
                    </p>
                    <p>
                      <b>Location : </b>
                      {personData.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="webScrtape">{webScrtape}</p>
          </div>
          <div className="d-flex">
            <div className="contacts">
              <h4>Contact User</h4>
              <div className="container">
                <button>
                  <img src={call} alt="call icon" />
                </button>
                <button>
                  <img src={skype} alt="skype icon" />
                </button>
                <button>
                  <img src={whtsap} alt="whtsap icon" />
                </button>
                <button>
                  <img src={add} alt="add icon" />
                </button>
              </div>
            </div>
            <div className="upcoming-activity">
              <h4>Upcoming activity</h4>
              <div className="container">
                <div className="single-task-item">
                  <div className="d-flex">
                    <img src={zoom} alt="zoom icon" />
                    <div>
                      <h3>{nextTask.title}</h3>
                      <p>{nextTask.time}</p>
                    </div>
                  </div>
                  <div>
                    <button>Start Meeting</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="activity-history">
              <h4>Activity History</h4>
              <div className="container">
                {history.map((val, key) => {
                  return (
                    <div className="single-history" key={key}>
                      <div className="d-flex">
                        <div className="date-details">
                          <h4>{val.month}</h4>
                          <h1>{val.date}</h1>
                          <h4>{val.year}</h4>
                        </div>
                        <div>
                          <h2>{val.title}</h2>
                          <p>{val.caller}</p>
                        </div>
                      </div>
                      <div>
                        <img src={checkIcon} alt="check icon" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="notes">
              <h4>Notes</h4>
              <div className="container">
                {notes.map((val, key) => {
                  return (
                    <div className="single-user-note" key={key}>
                      <div>
                        <img src={checkIcon} alt="notes icon" />
                      </div>
                      <div>
                        <h3>{val.title}</h3>
                        <p>{val.user}</p>
                      </div>
                    </div>
                  );
                })}
                <button>Add Notes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
