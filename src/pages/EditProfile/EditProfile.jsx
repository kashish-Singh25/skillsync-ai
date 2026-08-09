import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";


function EditProfile() {


    const navigate = useNavigate();


    const [resume, setResume] = useState(null);


    const [form, setForm] = useState({

        fullName:"",
        college:"",
        branch:"",
        graduationYear:"",
        github:"",
        linkedin:"",
        skills:"",
        projects:""

    });



    // Fetch Existing Profile

    useEffect(()=>{


        const fetchProfile = async()=>{


            try{


                const token = localStorage.getItem("token");


                const response = await api.get(

                    "/student/profile",

                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }

                );



                const student = response.data.student;



                setForm({

                    fullName: student.fullName || "",

                    college: student.college || "",

                    branch: student.branch || "",

                    graduationYear: student.graduationYear || "",

                    github: student.github || "",

                    linkedin: student.linkedin || "",

                    skills: student.skills?.join(", ") || "",

                    projects: student.projects?.join(", ") || ""

                });



            }
            catch(error){

                console.log(error);

            }


        };



        fetchProfile();



    },[]);






    // Handle Text Changes

    const handleChange=(e)=>{


        setForm({

            ...form,

            [e.target.name]:e.target.value

        });


    };






    // Update Profile

    const handleSubmit = async()=>{


        try{


            const token = localStorage.getItem("token");



            await api.put(

                "/student/update-profile",

                {


                    ...form,


                    graduationYear:Number(
                        form.graduationYear
                    ),



                    skills:

                    form.skills
                    .split(",")
                    .map(skill=>skill.trim()),



                    projects:

                    form.projects
                    .split(",")
                    .map(project=>project.trim())


                },


                {

                    headers:{

                        Authorization:`Bearer ${token}`

                    }

                }

            );



            alert("Profile Updated Successfully");


            navigate("/student/dashboard");



        }
        catch(error){


            console.log(error);


            alert("Update Failed");


        }


    };







    // Resume Upload

    const handleResumeUpload = async()=>{


        try{


            console.log(
                "Resume before upload:",
                resume
            );



            if(!resume){


                alert("Please select resume first");

                return;


            }




            const token = localStorage.getItem("token");



            const formData = new FormData();



            formData.append(
                "resume",
                resume
            );



            console.log(
                "FormData:",
                formData.get("resume")
            );





            const response = await api.post(


                "/student/upload-resume",


                formData,


                {

                    headers:{

                        Authorization:
                        `Bearer ${token}`

                    }

                }


            );



            console.log(
                response.data
            );



            alert(
                "Resume Uploaded Successfully"
            );



        }
        catch(error){



            console.log(

                "UPLOAD ERROR:",

                error.response?.data || error.message

            );



            alert(

                error.response?.data?.message ||

                "Resume Upload Failed"

            );


        }


    };






    return(


        <div className="min-h-screen bg-gray-100 p-8">


            <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-8">



                <h1 className="text-3xl font-bold text-blue-600 mb-8">

                    ✏️ Edit Profile

                </h1>





                {
                    Object.keys(form).map((field)=>(


                        <div 
                        key={field}
                        className="mb-5"
                        >


                            <label className="block font-semibold mb-2 capitalize">

                                {field}

                            </label>



                            <input

                                name={field}

                                value={form[field]}

                                onChange={handleChange}

                                className="w-full border rounded-xl p-3"

                            />


                        </div>


                    ))
                }







                {/* Resume Upload */}


                <div className="mb-6">


                    <label className="block font-semibold mb-2">

                        Upload Resume (PDF)

                    </label>




                    <input

                        type="file"

                        accept="application/pdf"


                        onChange={(e)=>{


                            const file =
                            e.target.files[0];


                            console.log(
                                "Selected File:",
                                file
                            );


                            setResume(file);


                        }}


                        className="border p-3 rounded-xl w-full"

                    />





                    <button

                        onClick={handleResumeUpload}

                        className="mt-3 bg-green-600 text-white px-5 py-2 rounded-xl"

                    >

                        Upload Resume

                    </button>


                </div>







                <button

                    onClick={handleSubmit}

                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"

                >

                    Save Changes

                </button>



            </div>



        </div>


    );



}


export default EditProfile;