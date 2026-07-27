import { useState } from "react";
import api from "../../services/api";

function ResumeAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const analyzeResume = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const profile = await api.get("/student/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await api.post("/resume-ai/analyze", {
        studentId: profile.data.student._id,
      });

      console.log(response.data.analysis);

      setAnalysis(response.data.analysis);

    } catch (err) {
      console.log(err);
    } finally { 
      setLoading(false);
    }
  };

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8">
    
        <div className="flex justify-between items-center mb-8">
    
            <div>
    
                <h2 className="text-3xl font-semibold text-white">
                    AI Resume Analysis
                </h2>
    
                <p className="text-slate-400 mt-2">
                    Get AI powered insights to improve your resume and increase your interview chances.
                </p>
    
            </div>
    
            <button
                onClick={analyzeResume}
                disabled={loading}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition"
            >
                {loading ? "Analyzing..." : "Analyze Resume"}
            </button>
    
        </div>

        {!analysis && (

<div className="bg-slate-800 border border-dashed border-slate-600 rounded-2xl p-10 text-center">

    <h3 className="text-2xl font-semibold text-white">
        No Analysis Yet
    </h3>

    <p className="text-slate-400 mt-3">
        Click <b>Analyze Resume</b> to generate AI feedback for your profile.
    </p>

</div>

)}
    
        {
    
            analysis && (
    
                <div className="space-y-6">
    
                    {/* Score */}
    
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
    
                        <p className="text-slate-400">
                            Resume Score
                        </p>
    
                        <h1
  className={`text-6xl font-bold mt-3 ${
    analysis.resumeScore >= 80
      ? "text-green-400"
      : analysis.resumeScore >= 70
      ? "text-yellow-400"
      : "text-red-400"
  }`}
>
                        {analysis.resumeScore}/100
                        </h1>
    
                    </div>
    
                    {/* Summary */}
    
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
    
                        <h3 className="text-xl font-semibold mb-4">
                            Summary
                        </h3>
    
                        <p className="text-slate-300 leading-8">
                            {analysis.summary}
                        </p>
    
                    </div>
    
                    {/* Extracted Skills */}
    
                    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
    
                        <h3 className="text-xl font-semibold mb-4">
                            Extracted Skills
                        </h3>
    
                        <div className="flex flex-wrap gap-3">
    
                            {
    
                                analysis.extractedSkills?.map((skill,index)=>(
    
                                    <span
                                        key={index}
                                        className="bg-slate-700 border border-slate-600 px-4 py-2 rounded-full text-indigo-300"
                                    >
                                        {skill}
                                    </span>
    
                                ))
    
                            }
    
                        </div>
    
                    </div>
    
                    {/* Strengths */}
    
                    <div className="bg-slate-800 border border-emerald-700 rounded-2xl p-6">
    
                        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                            Strengths
                        </h3>
    
                        <ul className="space-y-3 text-slate-300">
    
                            {
    
                                analysis.strengths?.map((item,index)=>(
    
                                    <li key={index}>
                                        • {item}
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    {/* Weaknesses */}
    
                    <div className="bg-slate-800 border border-red-700 rounded-2xl p-6">
    
                        <h3 className="text-xl font-semibold text-red-400 mb-4">
                            Areas to Improve
                        </h3>
    
                        <ul className="space-y-3 text-slate-300">
    
                            {
    
                                analysis.weaknesses?.map((item,index)=>(
    
                                    <li key={index}>
                                        • {item}
                                    </li>
    
                                ))
    
                            }
    
                        </ul>
    
                    </div>
    
                    {/* Suggestions */}
    
                    <div className="bg-slate-800 border border-indigo-700 rounded-2xl p-6">
    
                        <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                            AI Suggestions
                        </h3>
    
                        <ul className="space-y-3 text-slate-300">
    
                            {
    
                                // analysis.suggestions?.map((item,index)=>(
    
                                //     <li key={index}>
                                //         • {item}
                                //     </li>
    
                                // ))

                                analysis.suggestions?.map((item,i)=>(
                                    <li key={i}>
                                      {typeof item === "string"
                                        ? item
                                        : `${item.label} - ${item.description}`}
                                    </li>
                                  ))
    
                            }
    
                        </ul>
    
                    </div>
    
                </div>
    
            )
    
        }
    
    </div>
    
    );
}

export default ResumeAnalyzer;