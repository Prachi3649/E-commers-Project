
const aws = require("aws-sdk");

const ses = new aws.SES({ region: "us-east-1" });

// const REGION = "us-east-1";
aws.config.update({
  region: "us-east-1",
  accessKeyId: "AKIAYWHJYBGFEXWVQ7MM",
  secretAccessKey: "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",
});

async function sendEmail(mailOptions) {
    try {
      const data = await ses.sendEmail(mailOptions).promise();
      console.log("Message sent: %s", data.MessageId);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  module.exports.sendVerifyEmail = async (req, res) => {
    const { fullName, company ,emailAddress, phoneNumber, jobTitle, noOfQuestion, preferredSurveyPlatform, description, adPlatform } = req?.body;
  
    try {
        // Find the employee by email
        console.log("Finding employee",req?.body?.emailAddress);
    
        // Send an email
        const ToAddresses ="freeprogramming_campaign@miratsinsights.com"
        console.log("Here is the Code")
        const mailOptions1  = {
          Source: "Mirats Insights <freeprogramming_campaign@miratsinsights.com>",
          Destination: {
            ToAddresses: [req?.body?.emailAddress], // Use an array for the ToAddresses
          },
          Message: {
            Subject: {
              Data: "Confirmation of Your Complimentary Survey Programming Request with Mirats Insights",
            },
            Body: {
              Html: {
                Data:
                 `<!DOCTYPE html>
                 <html lang="en">
                   <head>
                     <meta charset="UTF-8" />
                     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                     <title>Confirmation of Your Complimentary Survey Programming Request with Mirats Insights</title>
                     <link
                       href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
                       rel="stylesheet"
                     />
                 <style>
                   * {
                   box-sizing: border-box;
                   padding: 0;
                   margin: 0;
                   font-family: "Poppins", sans-serif;
                 }
                 
                 .container {
                   background-color: #fff;
                   padding: 32px;
                   width: 800px;
                   display: flex;
                   justify-content: center;
                   align-items: center;
                   margin: 2em auto;
                 }
                 
                 .emailBody {
                   padding: 2em 10em 2em 5em;
                 }
                 
                 .emailBody .logo {
                   width: 250px;
                   margin-left: -1em;
                 }
                 
                 .emailBody .introText {
                   font-size: 25px;
                   font-weight: 600;
                   padding-right: 4em;
                   margin-bottom: 1em;
                   color: #333;
                 }
                 
                 .introDesc {
                   font-size: 15px;
                 }
                 
                 .introDesc strong {
                   font-weight: 600;
                 }
                 
                 .introDesc p {
                   margin: 1em 0;
                   line-height: 28px;
                 }
                 
                 .services h2 {
                   font-weight: 600;
                   font-size: 22px;
                   margin-bottom: 2em;
                   margin-top: 1em;
                   color: #333;
                 }
                 
                 .servicesFlex {
                   display: flex;
                   gap: 1em;
                   align-items: center;
                   margin-bottom: 1em;
                 }
                 
                 .servicesFlex h3 {
                   font-weight: 600;
                   font-size: 20px;
                 }
                 
                 .servicesFlex p {
                   font-size: 14px;
                 }
                 .servicesFlex img {
                    height: 30px;
                    margin-right:1em;
                  }
                 
                 .nextSteps {
                   margin-top: 2em;
                 }
                 
                 .nextSteps a {
                   color: darkgreen;
                   text-decoration: none;
                 }
                 
                 .emailBody footer {
                   margin-top: 2em;
                 }
                 
                 .emailBody footer a {
                   text-decoration: none;
                 }
                 
                 .emailBody footer .introFooterLogo {
                   width: 80px;
                   margin-right: 16em;
                 }
                 
                 .emailBody .introFooter section img {
                   width: 30px;
                   margin-right: 1em;
                 }
                 
                 .introFooter {
                   display: flex;
                   justify-content: space-between;
                   align-items: center;
                 }
                 
                 .address {
                   margin: 1.5em 0;
                 }
                 
                 .address h4 {
                   font-weight: 600;
                   margin-bottom: 0.3em;
                 }
                 
                 .address a {
                   color: #1765dc;
                 }
                 
                 .address p {
                   line-height: 25px;
                 }
                 
                 .rights {
                   font-size: 15px;
                 }
                 
                 </style>
                   </head>
                   <body>
                     <div class="container">
                       <section class="emailBody">
                         <img
                           src="https://mirats.in/unnamed%20(1).png"
                           alt="logo"
                           class="logo"
                         />
                         <h1 class="introText">
                           Your quest for precision and insightful data starts here.
                         </h1>
                         <div class="introDesc">
                           <p>Hi ${fullName}.</p>
                           <p>
                             We are thrilled to confirm the receipt of your request for Survey
                             Programming services. At Mirats Insights, we're excited to otter you
                             our expertise, free of charge for up to 40 questions. This
                             limited-time offer is our way of expressing gratitude for choosing
                             us.
                           </p>
                           <p>
                             Your project will be crafted using your preferred platform -
                             <strong>
                               QuestionPro, SurveyMonkey, Forsta, Qualtrics, or Zoho
                               Survey.</strong
                             >
                             As we proceed, we'll ensure your survey aligns perfectly with your
                             research objectives.
                           </p>
                         </div>
                 
                         <div class="services">
                           <h2>
                             Our services don't end here. We provide a spectrum of solutions
                             tailored for insightful data gathering and analysis:
                           </h2>
                 
                           <section class="servicesFlex">
                             <img
                               src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/3/3a6dc8a6-e5af-4d9f-ada1-9071640771ce.png"
                               alt=""
                             />
                             <div>
                               <h3>Survey Sampling</h3>
                               <p>Need sample on your surveys, get to mirats! we get it done</p>
                             </div>
                           </section>
                           <section class="servicesFlex">
                             <img
                               src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/3/53644ce6-cb2b-4d76-8527-cbdce09c964e.png"
                               alt=""
                             />
                             <div>
                               <h3>Want to work on Qualitative Projects?</h3>
                               <p>Let's connect and do awesome proiects</p>
                             </div>
                           </section>
                           <section class="servicesFlex">
                             <img
                               src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/3/2dda9de8-6930-42ec-b3df-b82d2732876a.png"
                               alt=""
                             />
                             <div>
                               <h3>Need to do Online IDIs and FGD.</h3>
                               <p>
                                 No Worries, We are there for you. There is no need to look any
                                 further when you have Mirats Insights support.
                               </p>
                             </div>
                           </section>
                         </div>
                 
                         <div class="nextSteps">
                           <h2 class="introText">Next Steps?</h2>
                           <p>
                             <em>
                               Our executives will review your request and will contact you on
                               the same email ID. If you have any other questions - Reach out to
                               <a href="mailto:bids@miratsinsights.com"
                                 >bids@miratsinsights.com.</a
                               >
                             </em>
                           </p>
                         </div>
                 
                         <footer>
                           <div class="introFooter">
                             <img
                               src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/zim6ldr1h5p1ur3utfbo"
                               alt=""
                               class="introFooterLogo"
                             />
                 
                             <section>
                               <a href="https://twitter.com/MiratsInsights" target="_blank">
                                 <img
                                   src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/2/dd1c00d3-8e48-47b9-a184-14c3f0dc5103.png"
                                   alt=""
                                   target="_blank"
                                 />
                               </a>
                               <a href="https://www.linkedin.com/company/miratsinsights" target="_blank">
                                 <img
                                   src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/2/cb2a4233-ae6b-4cee-8761-44e0dc01a839.png"
                                   alt=""
                                 />
                               </a>
                               <a href="https://www.instagram.com/miratsinsights/" target="_blank">
                                 <img
                                   src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/3/81739035-db75-45d1-a33f-5acb0e30dbd9.png"
                                   alt=""
                                 />
                               </a>
                               <a href="https://www.linkedin.com/company/miratsinsights" target="_blank">
                                 <img
                                   src="https://image.email.slackhq.com/lib/fe5515707c610d7b7312/m/2/83c59329-0895-43d2-a5a2-f113b1fa54f9.png"
                                   alt=""
                                 />
                               </a>
                             </section>
                           </div>
                           <div class="address">
                             <h4>©2023 Mirats Insights, PLC, a Mirats Group company.</h4>
                             <p><em>1st Floor, Pitambara House, Jankipuram, Lucknow </em></p>
                             <p><em>Lucknow 226 022, India </em></p>
                             <p>
                               <a
                                 href="miratsinsights.com
                                 "
                                 >miratsinsights.com
                               </a>
                             </p>
                           </div>
                           <p class="rights">All rights reserved. Various trademarks held by their respective owners.</p>
                         </footer>
                       </section>
                     </div>
                   </body>
                 </html>
                 `,
                Charset: "UTF-8",
              },
            },
          },
        };
        const mailOptions2  = {
            Source: "Mirats Insights Service <services@miratsinsights.com>",
            Destination: {
              ToAddresses: [ToAddresses], // Use an array for the ToAddresses
            },
            Message: {
              Subject: {
                Data: `New Survey Programming Request - ${fullName} from ${company}`,
              },
              Body: {
                Html: {
                  Data:
                  `<!DOCTYPE html>
                  <html lang="en">
                    <head>
                      <meta charset="UTF-8" />
                      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                      <link
                        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
                        rel="stylesheet"
                      />
                  <style>
                    * {
                    box-sizing: border-box;
                    padding: 0;
                    margin: 0;
                    font-family: "Poppins", sans-serif;
                  }
                  
                  .container {
                    background-color: #fff;
                    display: flex;
                    justify-content: center;
                    width: 800px;
                    margin: 0 auto;
                  }
                  
                  .emailBody {
                    padding: 2em 10em 2em 5em;
                  }
                  
                  .logoContainer {
                    border-bottom: 1px solid #eee;
                  }
                  
                  .emailBody .logo {
                    width: 250px;
                    margin-left: -1em;
                  }
                  
                  .emailBody .introText {
                    font-size: 18px;
                    font-weight: 600;
                    margin-top: 1em;
                    color: #333;
                  }
                  
                  .introDesc {
                    font-size: 15px;
                  }
                  
                  .introDesc strong {
                    font-weight: 600;
                  }
                  
                  .introDesc p {
                    margin: 1em 0;
                    line-height: 28px;
                  }
                  
                  .infoHeading {
                    margin: 1.5em 0;
                    font-weight: 600;
                  }
                  
                  .info strong {
                    font-weight: 500;
                  }
                  
                  .info p {
                    margin: 0.1em 0;
                  }
                  
                  .actions h3 {
                    margin: 1.5em 0 1em 0;
                    font-weight: 600;
                  }
                  
                  .actions strong {
                    font-weight: 500;
                  }
                  
                  .actions ul {
                    margin-left: 1.5em;
                    margin-bottom: 1em;
                    font-size: 15px;
                  }
                  
                  .regards {
                    font-size: 15px;
                    margin-top: 2em;
                    padding-bottom: 1em;
                    border-bottom: 1px solid #d4d4d4;
                  }
                  
                  .regards p {
                    margin: 1em 0;
                  }
                  
                  .footer {
                    text-align: center;
                    padding: 1.5em 0;
                    font-size: 15px;
                  }
                  
                  .textLight {
                    color: #585858;
                  }
                  
                  .footer h3 {
                    margin: 1em 0;
                    color: #585858;
                    font-weight: 500;
                  }
                  
                  .campaign {
                    color: #585858;
                    font-size: 14px;
                  }
                  
                  .introFooterLogo {
                    width: 80px;
                    margin-top: 2em;
                  }
                  
                  </style>
                    </head>
                    <body>
                      <div class="container">
                        <section class="emailBody">
                          <div class="logoContainer">
                            <img
                              src="https://mirats.in/unnamed%20(1).png"
                              alt="logo"
                              class="logo"
                            />
                          </div>
                          <h1 class="introText">
                            New Request Received for Free Programming Campaign
                          </h1>
                          <div class="introDesc">
                            <p>Dear Sales Team,</p>
                            <p>
                              We have received a new service request for survey programming that
                              requires your immediate attention and evaluation. Please find the
                              details of the client's request below:
                            </p>
                          </div>
                          <h3 class="infoHeading">Client Information:</h3>
                          <div class="info">
                            <p><span class="infoHeading">Full Name:</span> ${fullName}</p>
                            <p><span class="infoHeading">Company:</span> ${company}</p>
                            <p><span class="infoHeading">Contact Email:</span> ${emailAddress}</p>
                            <p><span class="infoHeading">Phone Number:</span> ${phoneNumber}</p>
                            <p><span class="infoHeading">Position:</span> ${jobTitle}</p>
                          </div>
                          <h3 class="infoHeading">Project Details:</h3>
                          <div class="info">
                            <p><span class="infoHeading">Number of Questions</span> ${noOfQuestion}</p>
                            <p><span class="infoHeading">Preferred Survey Platform</span> ${preferredSurveyPlatform}</p>
                            <p><span class="infoHeading">Additional Notes:</span> ${description}</p>
                          </div>
                  
                          <div class="actions">
                            <h3>Action Required:</h3>
                            <ul>
                              <li>
                                Initial Review: Examine the request specifics and assess our
                                ability to fulfill the service on the preferred platform,
                                <strong> ${adPlatform}.</strong>
                              </li>
                              <li>
                                Client Communication: Reach out to
                                <strong> ${fullName}</strong> to gather any further
                                requirements, discuss potential strategies, and establish project
                                timelines.
                              </li>
                              <li>
                                Feasibility Analysis: Ensure compatibility of our services with
                                the client's preferred survey platform and confirm that we can
                                meet the client's expectations.
                              </li>
                              <li>
                                Internal Coordination: Liaise with our survey programming team to
                                check the availability and allocate resources accordingly.
                              </li>
                              <li>
                                Proposal Drafting: Prepare a tailored proposal for
                                <strong>${fullName},</strong>
                                outlining our approach, the scope of services, and any
                                recommendations for the project.
                              </li>
                            </ul>
                  
                            <div class="regards">
                              <p>
                                Please prioritize this request and initiate contact with the
                                client at your earliest convenience. We aim to deliver a prompt
                                and professional response to solidify our client partnership.
                              </p>
                  
                              <p>Thank you for your swift action on this request.</p>
                              <p>Best regards,</p>
                              <p>Mirats Insights Team</p>
                            </div>
                  
                            <footer class="footer">
                              <p class="textLight">Campaign ID: 01DBC5-2A419B-A20327
                              </p>
                              <p class="textLight">Powered by Mirats Insights
                              </p>
                              <h3>Mirats Insights, PLC - Kalyanpur, Lucknow UP 226 022 India
                              </h3>
                              <p class="campaign">You have received this mandatory service request to process the request of the client of the Survey Programming Campaign. Please make sure to revert to the client as soon as possible.
                              </p>
                              <img
                              src="https://images.crunchbase.com/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/zim6ldr1h5p1ur3utfbo"
                              alt=""
                              class="introFooterLogo"
                            />
                            </footer>
                          </div>
                        </section>
                      </div>
                    </body>
                  </html>
                  
                  `,
                  Charset: "UTF-8",
                },
              },
            },
          };
        await sendEmail(mailOptions1);
        await sendEmail(mailOptions2);
    
    
        return res.status(200).json({
          success: true,
          message: "email sent successfully",
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "An error occurred",
          error: error.message,
        });
      }
  };


  module.exports.resetPassword = async (req, res) => {

    const { fromEmail,toEmails,url,name,companyName } = req.body;
  
    const companyName1 = "Mirats Insights";
    const companyName2 = "Macer India Research & Technology Services Private Limited";
    const companyName3 = "Atomos IT Services Private Limited";
    const companyName4 = "Sentriscope Data Intelligence Pvt. Ltd.";
  
    let subject = "";
    let footer = "";
    let logourl = "";
    if (companyName === companyName1) {
      subject = "Mirats Insights";
      logourl = "<img src='https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/Miratsinsightslogo.png' alt='logo' class=\"logo\" />\n";
      footer = `
          <div class="footer">
              <div class="footerContainer">
                  <p style="font-weight: 400;font-size: 16px;padding-bottom: 30px;">TM and © 2022 Mirats Insights Private Limited. All rights
                      reserved. </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      Mirats Insights Private Limited </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      1st Floor, Pitambara House,</p>
                  <p style="font-weight: 400;font-size: 16px;">
                      Tedhi Pulia Ring Road, Kalyanpur, </p>
                  <p style="font-weight: 400;font-size: 16px;">
                     Lucknow, Uttar Pradesh 226022</p>
                  <p style="font-weight: 400;
                  font-size: 16px;"> CIN: U72900UP2021PTC153917.</p>
                  <p style="font-weight: 400;font-size: 16px;"> Email:
                      <a href="mailto:Email: peoples@miratsinsights.com" style="color:#000000;">
                          peoples@miratsinsights.com
                      </a>
                  </p>
                  <p style="font-weight: 400;
                  font-size: 16px;padding-bottom: 30px;"> Website:
                      <a href="https://miratsinsights.com" style="color:#000000;">
                          https://miratsinsights.com
                      </a>
                  </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">All Rights
                          Reserved</a> 
                  | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Privacy Policy</a> 
                  | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Terms &
                      Conditions</a>
                  </p>
                  <img src="https://esomar.mirats.in/unnamed.png"
                      style="width: 171.82px; height: 33px; padding:  50px 0px 50px 0px;" />
              </div>
          </div>`;
    } else if (companyName === companyName2 ) {
      subject = "Macer India Research & Technology Services Private Limited";
      logourl = "<img src='https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/Miratsquantologo.png' alt='logo' style=\"width: 171.82px; height: 33px;\"  />\n";
      footer = `
          <div class="footer">
              <div class="footerContainer">
                  <p style="font-weight: 400; font-size: 16px;padding-bottom: 30px;">TM and © 2022 Macer India Research & Technology Services Private Limited. All rights
                      reserved. </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      Macer India Research & Technology Services Private Limited </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      NO B-21/D, 1st floor sry,</p>
                  <p style="font-weight: 400;font-size: 16px;">
                     Jankipuram, Lucknow, </p>
                  <p style="font-weight: 400;font-size: 16px;">
                     Uttar Pradesh, India - 2260211</p>
                  <p style="font-weight: 400; font-size: 16px;"> CIN: U74999UP2020PTC128760.</p>
                  <p style="font-weight: 400;font-size: 16px;"> Email:
                      <a href="mailto:Email: peoples@mirats.in" style="color:#000000;">
                          peoples@mirats.in
                      </a>
                  </p>
                  <p style="font-weight: 400;
                  font-size: 16px;padding-bottom: 30px;"> Website:
                      <a href="https://miratsinsights.com" style="color:#000000;">
                          https://miratsinsights.com
                      </a>
                  </p>
                  <p style="font-weight: 400;font-size: 16px;">
                      <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">All Rights
                          Reserved</a> 
                  | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Privacy Policy</a> 
                  | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Terms &
                      Conditions</a>
                  </p>
                  <img src="https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/Miratsinsightslogo.png"
                      style="width: 171.82px; height: 33px; padding:  50px 0px 50px 0px;" />
              </div>
          </div>`;
  }else if (companyName === companyName3) {
    subject = "Atomos IT Services Private Limited";
    logourl = `
        <img src="https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/Group+376.png" alt='logo' style="width: 175px; height: 55px;" />
    `;
    footer = `
        <div class="footer">
            <div class="footerContainer">
                <p style="font-weight: 400; font-size: 16px;padding-bottom: 30px;">TM and © 2022 Atomos IT Services Private Limited. All rights
                    reserved. </p>
                <p style="font-weight: 400;font-size: 16px;">
                    Atomos IT Services Private Limited </p>
                <p style="font-weight: 400;font-size: 16px;">
                    305, 1Aerocity NIBR Corporate Park Nr,</p>
                <p style="font-weight: 400;font-size: 16px;">
                    Sakinaka Junction, Mumbai, </p>
                <p style="font-weight: 400;font-size: 16px;">
                   Maharashtra  400 072</p>
                <p style="font-weight: 400; font-size: 16px;"> CIN: U72900UP2021PTC153917.</p>
                <p style="font-weight: 400;font-size: 16px;padding-bottom: 30px;"> Website:
                    <a href="https://miratsinsights.com" style="color:#000000;">
                        https://miratsinsights.com
                    </a>
                </p>
                <p style="font-weight: 400;font-size: 16px;">
                    <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">All Rights
                        Reserved</a> 
                | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Privacy Policy</a> 
                | <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Terms &
                    Conditions</a>
                </p>
                <img src="https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/Group+376.png"
                    style="width: 175px; height: 55px; padding:  50px 0px 50px 0px;" />
            </div>
        </div>
    `;
  } else if (companyName === companyName4) {
    subject = "Sentriscope Data Intelligence Pvt. Ltd.";
  logourl = `
      <img src="https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/image_2023_08_14T09_29_39_753Z.png" alt='logo' class="logo" />
  `;
  footer = `
      <div class="footer">
          <div class="footerContainer">
              <p style="font-weight: 400; font-size: 16px;padding-bottom: 30px;">TM and © 2022 Sentriscope Data Intelligence Pvt. Ltd.. All rights
                  reserved. </p>
              <p style="font-weight: 400;font-size: 16px;">
                  Sentriscope Data Intelligence Pvt. Ltd. </p>
              <p style="font-weight: 400;font-size: 16px;">
                  Office No.- 3, First floor,</p>
              <p style="font-weight: 400;font-size: 16px;">
                  H-150, Sector - 63, </p>
              <p style="font-weight: 400;font-size: 16px;">
                 Noida - 201301 , Uttar Pradesh 226022</p>
              <p style="font-weight: 400;font-size: 16px;"> Email:
                  <a href="mailto:peoples@miratsinsights.com" style="color:#000000;">
                      peoples@miratsinsights.com
                  </a>
              </p>
              <p style="font-weight: 400;
                  font-size: 16px;padding-bottom: 30px;"> Website:
                  <a href="https://miratsinsights.com" style="color:#000000;">
                      https://miratsinsights.com
                  </a>
              </p>
              <p style="font-weight: 400;font-size: 16px;">
                  <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">All Rights
                      Reserved</a> |
                  <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Privacy Policy</a> |
                  <a href="https://peoples.miratsoneservices.com/login" style="color:#000000;">Terms &
                      Conditions</a>
              </p>
              <img src="https://miratsfilestorage.s3.ap-south-1.amazonaws.com/onboardEmail/image_2023_08_14T09_29_39_753Z.png"
                  style="width: 171.82px; height: 33px; padding:  50px 0px 50px 0px;" />
          </div>
      </div>
  `;
  
  }
  
    try {
      // Find the employee by email
  
      // Send an email
      console.log("Here is the Code")
      const mailOptions = {
        Source: `${fromEmail}`,
        Destination: {
          ToAddresses: [toEmails], // Use an array for the ToAddresses
        },
        Message: {
          Subject: {
            Data: `${companyName} Password Reset`,
          },
          Body: {
            Html: {
              Data:
                `<!DOCTYPE html> 
                 <html lang="en"> 
                  
                 <head> 
                     <meta charset="UTF-8" /> 
                     <meta http-equiv="X-UA-Compatible" content="IE=edge" /> 
                     <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
                     <link rel="stylesheet" href="https://apple.com/wss/fonts?families=SF+Pro,v3|SF+Pro+Icons,v3" type="text/css" 
                         media="all" /> 
                     <title>Reset Password</title> 
                     <style> 
                         * { 
                             margin: 0px auto; 
                             padding: 0px; 
                             font-family: "SF Pro Text", "SF Pro Icons", "Helvetica Neue", 
                                 "Helvetica", "Arial", sans-serif; 
                  
                         } 
                         .imageParrentContainer { 
                  
                             margin-top: 20px; 
                             text-align: center; 
                             padding: 20px 0px 20px 0px; 
                         } 
                         .ParrentContainer { 
                             padding: 35px 25px 20px 35px; 
                         } 
                  
                         .footerContainer { 
                             text-align: center; 
                             padding: 20px 0px 20px 0px; 
                         } 
                  
                  
                         .test { 
                             border: 1px solid red; 
                         } 
                  
                         .main { 
                             width: 580px; 
                             height: 500px; 
                             background: linear-gradient(124.88deg, #000000 0%, rgba(51, 51, 51, 0.95) 100%); 
                             box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.25); 
                             border-radius: 25px; 
                         } 
                  
                         .subject { 
                             padding-top: 30px; 
                             font-weight: 300; 
                             font-size: 36px; 
                             line-height: 43px; 
                             color: #FFFFFF; 
                         } 
                  
                         .subject span { 
                             font-weight: 500; 
                             font-size: 36px; 
                             line-height: 43px; 
                         } 
                  
                         .line { 
                             padding-top: 40px; 
                             font-weight: 280; 
                             font-size: 20px; 
                             line-height: 24px; 
                             color: #FFFFFF; 
                         } 
                  
                         .line span { 
                             padding-top: 20px; 
                             font-weight: 400; 
                             font-size: 20px; 
                             line-height: 24px; 
                         } 
                         .button{ 
                             text-align: center; 
                              
                             font-weight: 340; 
                              
                             font-size: 20px; 
                             display: flex; 
                             width: 200px; 
                             align-items: center; 
                             padding: 10px; 
                             background: linear-gradient(93.58deg, rgba(255, 255, 255, 0.5) 0%, #FFFFFF 51.33%, rgba(255, 255, 255, 0.5) 100%); 
                             box-shadow: 0px 0px 12px rgba(255, 255, 255, 0.28); 
                             border-radius: 10px; 
                         } 
                         .btn1 { 
                             text-decoration: none; 
                             color: #000000 !important; 
                         } 
                  
                         .footer { 
                             width: 550px !important; 
                             border-radius: 23px; 
                             margin-top: 50px; 
                             margin-bottom: 60px; 
                             width: 659px; 
                             background-color: #e9e9e9; 
                             box-shadow: 10px 10px 5px #aaaaaa; 
                  
                         } 
                     </style> 
                 </head> 
                  
                 <body> 
                     <div class="imageParrentContainer"> 
                `+ logourl+`
                     </div> 
                     <div class="container"> 
                  
                         <div class="main"> 
                             <div class="ParrentContainer"> 
                                 <div class="subject"> 
                                     ` +name + `
                  you have requested to <span>reset</span> your <span>password</span> 
                                 </div> 
                                 <div class="line"> 
                                     We cannot simply send you your <span>old password</span> so we have generated a unique link to 
                                     <span>reset your 
                                         password.</span> 
                                 </div> 
                                 <div class="line"> 
                                     To reset your password, <span>click on the button</span> and follow the instructions 
                                 </div> 
                             </div> 
                             <div class="button"> 
                                 <a class="btn1" href=` + url +` >Reset Password</a> 
                             </div> 
                         </div> 
               ` + footer +`
                     </div> 
                 </body> 
                 </html>
                `,
              Charset: "UTF-8",
            },
          },
        },
      };
      await sendEmail(mailOptions);
  
  
      return res.status(200).json({
        success: true,
        message: "email sent successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }
  };