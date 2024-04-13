import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import Header from "./components/Header";
import General from "./components/General";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Preview from "./components/Preview";
import "@fontsource/roboto/500.css";
import { useReactToPrint } from "react-to-print";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useRef, useState } from "react";
import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  // General section
  const [generalData, setGeneralData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    phone: "",
  });
  const handleGeneralInfoChange = (field, value) => {
    setGeneralData({ ...generalData, [field]: value });
  };
  const fullName = generalData.firstName + " " + generalData.lastName;

  // Education section
  const [educationData, setEducationData] = useState({
    school: "",
    city: "",
    degree: "",
    dateStart: null,
    dateEnd: null,
  });
  const handleEducationInfoChange = (field, value) => {
    setEducationData({ ...educationData, [field]: value });
  };

  // TODO переделать функцию
  // function computeFullDate() {
  //   if (selectedDateStart && selectedDateEnd) {
  //     const startMonth = getMonthByIndex(selectedDateStart.$M);
  //     const endMonth = getMonthByIndex(selectedDateEnd.$M);

  //     setFormData({
  //       ...formData,
  //       fullDate:
  //         startMonth +
  //         " " +
  //         selectedDateStart.$y +
  //         " - " +
  //         endMonth +
  //         " " +
  //         selectedDateEnd.$y,
  //     });
  //     console.log(formData.fullDate);
  //   } else if (selectedDateStart && selectedDateEnd === null) {
  //     const startMonth = getMonthByIndex(selectedDateStart.$M);
  //     setFormData({
  //       ...formData,
  //       fullDate: startMonth + " " + selectedDateStart.$y + " - " + "Present",
  //     });
  //     console.log(formData.fullDate);
  //   }
  // }

  // Experience
  const [experienceData, setExperienceData] = useState([
    {
      id: 0, // Unique identifier for each job
      title: "",
      companyName: "",
      companyLocation: "",
      dateStart: null,
      dateEnd: null,
      description: "",
    },
    {
      id: 1, // Unique identifier for each job
      title: "",
      companyName: "",
      companyLocation: "",
      dateStart: null,
      dateEnd: null,
      description: "",
    },
  ]);
  const handleExperienceInfoChange = (jobId, field, value) => {
    setExperienceData(
      experienceData.map((job) => {
        if (job.id === jobId) {
          return { ...job, [field]: value };
        }
        return job;
      })
    );
  };
  // Printing
  // TODO разобраться с печатью. узнать про forwardRef?
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });
  // TODO переделать компонент experience как остальные
  return (
    <MantineProvider theme={theme}>
      <>
        <Header />

        <div className="main">
          <button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
          >
            Print preview
          </button>
          <General formData={generalData} onChange={handleGeneralInfoChange} />
          <Education
            formData={educationData}
            onChange={handleEducationInfoChange}
          />
          <Experience
            formData={experienceData}
            onChange={handleExperienceInfoChange}
          />
        </div>
        <div className="preview">
          <div ref={contentToPrint}>Hello again</div>
          <Preview
            generalData={generalData}
            educationData={educationData}
            experienceData={experienceData}
          />
        </div>
        <Footer />
      </>
    </MantineProvider>
  );
}

export default App;
