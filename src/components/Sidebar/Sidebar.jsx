import {
    LayoutDashboard,
    User,
    FileText,
    Briefcase,
    Award,
    Brain,
    Settings,
    LogOut,
  } from "lucide-react";
  
  function Sidebar() {
    const menu = [
      { icon: <LayoutDashboard size={20} />, title: "Dashboard" },
      { icon: <User size={20} />, title: "Profile" },
      { icon: <FileText size={20} />, title: "Resume" },
      { icon: <Briefcase size={20} />, title: "Projects" },
      { icon: <Award size={20} />, title: "Certificates" },
      { icon: <Brain size={20} />, title: "AI Insights" },
      { icon: <Settings size={20} />, title: "Settings" },
    ];
  
    return (
      <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col">
  
        <div className="p-8 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">
            SkillSync AI
          </h1>
        </div>
  
        <nav className="flex-1 p-6 space-y-2">
  
          {menu.map((item) => (
            <button
              key={item.title}
              className="w-full flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-slate-800 transition"
            >
              {item.icon}
  
              {item.title}
            </button>
          ))}
  
        </nav>
  
        <div className="p-6">
  
          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl bg-red-500 hover:bg-red-600 transition">
  
            <LogOut size={20} />
  
            Logout
  
          </button>
  
        </div>
  
      </aside>
    );
  }
  
  export default Sidebar;