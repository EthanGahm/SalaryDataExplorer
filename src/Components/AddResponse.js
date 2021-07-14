import React from "react";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems } from "./listItems";
import Title from "./Title";
import Copyright from "./Copyright";
import useStyles from "./UseStyles.js";
import PageTitle from "./PageTitle";
import SurveyComponent from "../AddResponse/Survey";
// import SurveyComponent from "../AddResponse/Survey";
let res;
/**
 * This component is to add responses to our database by embedding a Google Form with questions matching the original survey's
 * @returns a rendered google form and extra components to format the web-page
 */
export default function AddResponse() {
  // Page Styling
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // code from this website : https://gomakethings.com/serializing-form-data-with-the-vanilla-js-formdata-object/
  document.addEventListener("submit", function (event) {
    event.preventDefault();

    // fetch("https://salary-data-api.herokuapp.com/salary_data/addResponse", {
    //   method: "POST",
    //   body: JSON.stringify(Object.fromEntries(new FormData(event.target))),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then(function (response) {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     return Promise.reject(response);
    //   })
    //   .then(function (data) {
    //     // console.log( data);
    //   })
    //   .catch(function (error) {
    //     // console.warn(error);
    //   });
  });

  // returning components and web page design elements
  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <PageTitle text="Add a Response" />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
      </Drawer>
      {/* This is the main part of the page, where the google form can be taken */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Title>Add Your Own Response! </Title>
          <Box>
            <SurveyComponent />
            {/* <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSdsCwNyG9kLUVL8QqINFvW-jLQAMHJkyXo6ykaS2ei4MTtPqA/viewform?embedded=true"
              width="640"
              height="3812"
              frameborder="0"
              marginheight="0"
              marginwidth="0"
            >
              Loading…
            </iframe> */}
            {/* <script
              type="text/javascript"
              src="https://form.jotform.com/jsform/211918227413048"
            ></script>
            <iframe
              id="JotFormIFrame-211918227413048"
              title="Survey Response Form"
              onload="window.parent.scrollTo(0,0)"
              allowtransparency="true"
              allowfullscreen="true"
              allow="geolocation; microphone; camera"
              src="https://form.jotform.com/211918227413048"
              frameborder="0"
              style={{ width: 800, height: 4000 }}
              scrolling="no"
            >
              {" "}
            </iframe> */}
            {/* <SurveyComponent /> */}
          </Box>
          {/* Copyright htmlFor the app */}
          <Box pt={5}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

/* <form id="rendered-form">
  <div className="rendered-form">
    <div className="formbuilder-text form-group field-job_title">
      <label htmlFor="job_title" className="formbuilder-text-label">
        What is your exact job title?
        <span className="formbuilder-required">*</span>
      </label>
      <input
        type="text"
        className="form-control"
        name="job_title"
        access="false"
        id="job_title"
        required="required"
        aria-required="true"
      />
    </div>
  </div>
</form>; */
// }
{
  /* <form id="rendered-form" name="surveyForm" action="" method="POST">
  <div className="rendered-form">
    <div className="formbuilder-radio-group form-group field-age">
      <label htmlFor="age" className="formbuilder-radio-group-label">
        What is your age? **
        <br />
      </label>
      <div className="radio-group">
        <div className="formbuilder-radio">
          <input
            name="age"
            access="false"
            id="age-0"
            required="required"
            aria-required="true"
            value="under 18"
            type="radio"
          />
          <label htmlFor="age-0">under 18</label>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-1"
              required="required"
              aria-required="true"
              value="18-24"
              type="radio"
            />
            <label htmlFor="age-1">18 - 24</label>
          </div>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-2"
              required="required"
              aria-required="true"
              value="25-34"
              type="radio"
            />
            <label htmlFor="age-2">25 - 34</label>
          </div>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-3"
              required="required"
              aria-required="true"
              value="35-44"
              type="radio"
            />
            <label htmlFor="age-3">35 - 44</label>
          </div>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-4"
              required="required"
              aria-required="true"
              value="45-54"
              type="radio"
            />
            <label htmlFor="age-4">45 -54</label>
          </div>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-5"
              required="required"
              aria-required="true"
              value="55-64"
              type="radio"
            />
            <label htmlFor="age-5">55 - 64</label>
          </div>
          <div className="formbuilder-radio">
            <input
              name="age"
              access="false"
              id="age-6"
              required="required"
              aria-required="true"
              value="65 or over"
              type="radio"
            />
            <label htmlFor="age-6" />
            65 or over
          </div>
        </div>
      </div>
      <br />
      <br />
      <div className="formbuilder-select form-group field-industry">
        <label htmlFor="industry" className="formbuilder-select-label">
          What industry do you work in? **
          <br />
        </label>
        <select className="form-control" name="industry" id="industry">
          <option value="Accounting, Banking &amp; Finance" id="industry-0">
            Accounting, Banking &amp; Finance
          </option>
          <option value="Aerospace" id="industry-1">
            Aerospace
          </option>
          <option value="Agriculture or Forestry" id="industry-2">
            Agriculture or Forestry
          </option>
          <option value="Art &amp; Design" id="industry-3">
            Art &amp; Design
          </option>
          <option value="Auto Repair" id="industry-4">
            Auto Repair
          </option>
          <option value="Business or Consulting" id="industry-5">
            Business or Consulting
          </option>
          <option value="Computing or Tech" id="industry-6">
            Computing or Tech
          </option>
          <option value="Education" id="industry-7">
            Education
          </option>
          <option value="Energy" id="industry-8">
            Energy
          </option>
          <option value="Engineering or Manufacturing" id="industry-9">
            Engineering or Manufacturing
          </option>
          <option value="Entertainment" id="industry-10">
            Entertainment
          </option>
          <option value="Environment" id="industry-11">
            Environment
          </option>
          <option value="Food" id="industry-12">
            Food
          </option>
          <option value="Government and Public Administration" id="industry-13">
            Government and Public Administration
          </option>
          <option value="Health care" id="industry-14">
            Health care
          </option>
          <option value="Hospitality &amp; Events" id="industry-15">
            Hospitality &amp; Events
          </option>
          <option value="Insurance" id="industry-16">
            Insurance
          </option>
          <option value="Law or Law Enforcement" id="industry-17">
            Law or Law Enforcement
          </option>
          <option value="Leisure, Sport &amp; Tourism" id="industry-18">
            Leisure, Sport &amp; Tourism
          </option>
          <option value="Library" id="industry-19">
            Library
          </option>
          <option value="Marketing, Advertising &amp; PR" id="industry-20">
            Marketing, Advertising &amp; PR
          </option>
          <option value="Media &amp; Digital" id="industry-21">
            Media &amp; Digital
          </option>
          <option value="Nonprofits" id="industry-22">
            Nonprofits
          </option>
          <option value="Property or Construction" id="industry-23">
            Property or Construction
          </option>
          <option value="Publishing" id="industry-24">
            Publishing
          </option>
          <option value="Recruitment or HR" id="industry-25">
            Recruitment or HR
          </option>
          <option value="Research" id="industry-26">
            Research
          </option>
          <option value="Retail" id="industry-27">
            Retail
          </option>
          <option value="Sales" id="industry-28">
            Sales
          </option>
          <option value="Social Work" id="industry-29">
            Social Work
          </option>
          <option value="Transport or Logistics" id="industry-30">
            Transport or Logistics
          </option>
          <option value="Utilities &amp; Telecommunications" id="industry-31">
            Utilities &amp; Telecommunications
          </option>
          <option value="Other" id="industry-32">
            Other
          </option>
        </select>
      </div>
      <br />

      <div className="formbuilder-text form-group field-job_title">
        <label htmlFor="job_title" className="formbuilder-text-label">
          What is your exact job title? **
          <br />
          <span className="formbuilder-required"></span>
        </label>
        <input
          type="text"
          className="form-control"
          name="job_title"
          access="false"
          id="job_title"
          required="required"
          aria-required="true"
        />
      </div>
    </div>
    <br />
    <div className="formbuilder-number form-group field-annual_salary">
      <label htmlFor="annual_salary" className="formbuilder-number-label">
        What is your annual income (in USD, please)? **
        <br />
      </label>
      <input
        type="number"
        className="form-control"
        name="annual_salary"
        access="false"
        min="0"
        max="50000000"
        step="5000"
        id="annual_salary"
        required="required"
        aria-required="true"
      />
    </div>
    <br />
    <div className="formbuilder-radio-group form-group field-currency">
      <label htmlFor="currency" className="formbuilder-radio-group-label">
        What currency is your income in (should be USD)? **
      </label>
      <div className="radio-group">
        <div className="formbuilder-radio">
          <input
            name="currency"
            access="false"
            id="currency-0"
            required="required"
            aria-required="true"
            value="USD"
            type="radio"
          />
          <label htmlFor="currency-0">USD</label>
        </div>
      </div>
    </div>

    <br />
    <div className="formbuilder-radio-group form-group field-work_experience">
      <label
        htmlFor="work_experience"
        className="formbuilder-radio-group-label"
      >
        How many years of work experience do you have (professional) ? **
      </label>
      <div className="radio-group">
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-0"
            required="required"
            aria-required="true"
            value="0 - 1 years"
            type="radio"
          />
          <label htmlFor="work_experience-0">0 - 1 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-1"
            required="required"
            aria-required="true"
            value="2 - 4 years"
            type="radio"
          />
          <label htmlFor="work_experience-1">2 - 4 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-2"
            required="required"
            aria-required="true"
            value="5 - 7 years"
            type="radio"
          />
          <label htmlFor="work_experience-2">5 - 7 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-3"
            required="required"
            aria-required="true"
            value="8 - 10 years"
            type="radio"
          />
          <label htmlFor="work_experience-3">8 - 10 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-4"
            required="required"
            aria-required="true"
            value="11 - 20 years"
            type="radio"
          />
          <label htmlFor="work_experience-4">11 - 20 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-5"
            required="required"
            aria-required="true"
            value="21 - 30 years"
            type="radio"
          />
          <label htmlFor="work_experience-5">21 - 30 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-6"
            required="required"
            aria-required="true"
            value="31 - 40 years"
            type="radio"
          />
          <label htmlFor="work_experience-6">31 - 40 years</label>
        </div>
        <div className="formbuilder-radio">
          <input
            name="work_experience"
            access="false"
            id="work_experience-7"
            required="required"
            aria-required="true"
            value="41 years or more"
            type="radio"
          />
          <label htmlFor="work_experience-7">41 years or more</label>
        </div>
      </div>
    </div>
    <br />
    <div className="formbuilder-textarea form-group field-context_for_job">
      <label htmlFor="context_for_job" className="formbuilder-textarea-label">
        If you have any additional context for your job, please put it here:
      </label>
      <br />
      <textarea
        type="textarea"
        className="form-control"
        name="context_for_job"
        access="false"
        id="context_for_job"
      ></textarea>
    </div>
    <br />
    <div className="formbuilder-number form-group field-additional_income">
      <label htmlFor="additional_income" className="formbuilder-number-label">
        Please list any additional income or monetary compensation you received
        in a year: **
      </label>
      <br />
      <input
        type="number"
        className="form-control"
        name="other_compensation"
        access="false"
        min="0"
        step="5000"
        id="other_compensation"
        required="required"
        aria-required="true"
      />
    </div>
    <br />
    <div className="formbuilder-textarea form-group field-context">
      <label htmlFor="context" className="formbuilder-textarea-label">
        If you have any additional context for your extra/added income, please
        put it here:
      </label>
      <br />
      <textarea
        type="textarea"
        className="form-control"
        name="context"
        access="false"
        id="context"
      ></textarea>
    </div>
    <br />
    <button type="submit" id="button">
      Submit
    </button>
  </div>
</form>; */
}
