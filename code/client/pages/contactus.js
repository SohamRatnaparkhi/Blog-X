import React, { useState,useRef } from 'react'
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import emailjs from 'emailjs-com';

const styles = {
  wrapper:
    "flex justify-center items-center h-screen w-screen bg-[#0f172a] text-white overflow-x-hidden",
  columns:
    "flex justify-between h-screen w-full text-center  text-white gap-0.5",
  sides: "basis-1/4 bg-slate-900 h-full overflow-y-auto",
  side2: "basis-3/4 bg-slate-900 h-full flex flex-row overflow-x-hidden  ",
  feed: "basis-2/3 bg-slate-800 h-full overflow-x-hidden overflow-y-auto",
  widgets: "basis-1/3 bg-slate-900 h-full overflow-x-hidden overflow-y-auto",
};

const contactus = () => {
    const form = useRef();
  
    const sendEmail = (e) => {
      // e.preventDefault();
  
      emailjs.sendForm('service_cdrhsgb', 'template_ifylsyf', form.current, '24tJDvCxeu4cB981S')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.columns}>
          <div className={styles.sides}>
            <Sidebar />
          </div>
          <div className={styles.side2}>
            <div className={styles.feed}>

              <div className="bg-[faf8f8] m-0 p-0 min-h-[100vh]">
                <h1 className="text-center text-[#f5f5f4] text-4xl font-bold mt-2">Contact us</h1>
                <div>
                  <div className="container bg-[#f8fafc]  align-text-bottom items-center m-auto bottom-0px w-4/5 h-3/5 p-6 rounded-lg shadow-lg">
                    <form ref={form} onSubmit={sendEmail}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                        <input type="text" className="w-full mt-2 p-4 outline-none border-none rounded-lg" placeholder="Enter your name"></input>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control w-full mt-2 p-4 outline-none border-none rounded-lg" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control w-full mt-2 p-4 outline-none border-none rounded-lg" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control w-full rounded-lg p-4" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <button type="submit" className="w-full p-3 mt-2 bg-[#1c1917] text-lg text-white rounded-lg outline-none border-none font-bold tracking-wide traition-all hover:bg-[#dc2626]">
                                        Submit
                                    </button>

                    </div>
                    </form>

                  </div>
                </div>
              </div>
            </div>
            <div className={styles.widgets}>
              <Widgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contactus
