import React, { useState, useEffect } from "react";

function Stats() {
  const [stats, setStats] = useState({});

  function fetchStats() {
    fetch("http://localhost/api/stats")
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
      });
  }

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="stats-container">
      <div className="stats-content">
        <table className="stats-table">
          <tbody>
            <tr>
              <td>
                <strong>Number of Contacts</strong>
              </td>
              <td>{stats.ContactNum}</td>
            </tr>
            <tr>
              <td>
                <strong>Number of Phones</strong>
              </td>
              <td>{stats.PhoneNum}</td>
            </tr>
            <tr>
              <td>
                <strong>Newest Contact Timestamp</strong>
              </td>
              <td>{stats.newContact}</td>
            </tr>
            <tr>
              <td>
                <strong>Oldest Contact Timestamp</strong>
              </td>
              <td>{stats.oldContact}</td>
            </tr>
            <tr>
              <td colSpan="2">
                <button
                  type="button"
                  onClick={fetchStats}
                  className="refresh-stats"
                >
                  Refresh stats
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Stats;
