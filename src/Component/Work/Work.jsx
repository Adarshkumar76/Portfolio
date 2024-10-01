import React from "react";
import "./Work.css";

function Work() {
  const work = [
    {
      img: "/html.png",
      title: "HTML Developer",
      dur: "(2022-2023)",
      desc: "I started learning HTML at Computer Hub(Siwan) which is affiliated by immense institute of technology & Management in 2022 and i work on some interesting projects.",
    },
    {
      img: "/css.png",
      title: "CSS Developer",
      dur: "(2022-2023)",
      desc: " I started learning CSS at YouTube with CodeWithHarry in 2022 and i work on some responsive web design & some interesting projects.",
    },
    {
      img: "/js.png",
      title: "JavaScript Developer",
      dur: "(2022-2023)",
      desc: " I started learning JavaScript at YouTube with CodeWithHarry in 2022 after completion on JavaScript course and i work on some interesting projects.",
    },
    {
      img: "/react.png",
      title: "React js Developer",
      dur: "(2023-2024)",
      desc: "I started learning React js at YouTube with CodeWithHarry in 2023 after completion on React js course and i work on some interesting projects and enjoy our journey.",
    },
    {
      img: "/react.png",
      title: "React-Native Developer",
      dur: "(2023-2024)",
      desc: "I started learning React-Native at YouTube with Code Step By Step in 2023 after completion on React-native course and i work on some interesting projects and enjoy our journey.",
    },
  ];
  return (
    <>
      <div className="work-bottom">
        <h1>Work Experience</h1>
        <div className="box">
          {work.map((workItem) => {
            return (
              <div className="card">
                <img src={workItem.img} alt={workItem.title} />
                <h3>{workItem.title}</h3>
                <h4>{workItem.dur}</h4>
                <p>{workItem.desc}</p>
              </div>
            );
          })}
        </div>  
      </div>
    </>
  );
}

export default Work;
