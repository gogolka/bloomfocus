'use client'
import { useState } from "react";

const QUESTIONS = [
  // INATTENTIVE (I) — 20 questions
  { id:1,  type:"I", text:"I have trouble sustaining attention in tasks or leisure activities" },
  { id:2,  type:"I", text:"I make careless mistakes in schoolwork, work, or other activities" },
  { id:3,  type:"I", text:"I often seem to not listen when spoken to directly" },
  { id:4,  type:"I", text:"I fail to follow through on instructions and don't finish tasks" },
  { id:5,  type:"I", text:"I have difficulty organizing tasks and activities" },
  { id:6,  type:"I", text:"I avoid or dislike tasks that require sustained mental effort" },
  { id:7,  type:"I", text:"I often lose things necessary for tasks (keys, phone, wallet, documents)" },
  { id:8,  type:"I", text:"I am easily distracted by external stimuli or unrelated thoughts" },
  { id:9,  type:"I", text:"I am forgetful in daily activities" },
  { id:10, type:"I", text:"I have difficulty starting tasks, even when I want to do them" },
  { id:11, type:"I", text:"I leave projects unfinished and move on to something new" },
  { id:12, type:"I", text:"I have trouble reading long texts or books without losing focus" },
  { id:13, type:"I", text:"I miss important deadlines or forget appointments" },
  { id:14, type:"I", text:"I zone out during conversations, even when I'm interested" },
  { id:15, type:"I", text:"I often feel overwhelmed by tasks that seem manageable to others" },
  { id:16, type:"I", text:"I have difficulty prioritizing what to do first" },
  { id:17, type:"I", text:"I hyperfocus on things I enjoy but can't focus on things I don't" },
  { id:18, type:"I", text:"I struggle to manage my time — I consistently underestimate how long things take" },
  { id:19, type:"I", text:"I frequently switch between tasks without completing any of them" },
  { id:20, type:"I", text:"I find it hard to hold information in mind while doing something else" },
  // HYPERACTIVE / IMPULSIVE (H) — 20 questions
  { id:21, type:"H", text:"I feel restless or fidgety when I have to sit still for a long time" },
  { id:22, type:"H", text:"I leave my seat in situations where staying seated is expected" },
  { id:23, type:"H", text:"I feel an internal sense of restlessness even when sitting still" },
  { id:24, type:"H", text:"I have difficulty engaging in activities quietly" },
  { id:25, type:"H", text:"I often feel 'on the go' or driven by a motor" },
  { id:26, type:"H", text:"I talk excessively or feel a constant urge to talk" },
  { id:27, type:"H", text:"I blurt out answers before a question is finished" },
  { id:28, type:"H", text:"I have difficulty waiting for my turn" },
  { id:29, type:"H", text:"I interrupt or intrude on others in conversations or activities" },
  { id:30, type:"H", text:"I make impulsive decisions I later regret" },
  { id:31, type:"H", text:"I impulsively buy things without thinking about whether I need them" },
  { id:32, type:"H", text:"I have a short temper or get frustrated quickly" },
  { id:33, type:"H", text:"I seek out stimulation and get bored very easily" },
  { id:34, type:"H", text:"I take risks without fully thinking about the consequences" },
  { id:35, type:"H", text:"I struggle to relax — my brain doesn't slow down even when I want it to" },
  { id:36, type:"H", text:"I frequently change plans, jobs, relationships, or goals impulsively" },
  { id:37, type:"H", text:"I react emotionally and intensely, more than the situation seems to call for" },
  { id:38, type:"H", text:"I have trouble going to sleep because my mind won't stop" },
  { id:39, type:"H", text:"I tend to interrupt people mid-sentence without meaning to be rude" },
  { id:40, type:"H", text:"I find waiting for anything — results, replies, queues — genuinely difficult" },
];

const OPTIONS = [
  { label:"Never",      value:0 },
  { label:"Rarely",     value:1 },
  { label:"Sometimes",  value:2 },
  { label:"Often",      value:3 },
  { label:"Very often", value:4 },
];

const RESULTS: Record<string, any> = {
  negative:{
    title:"Low ADHD indicators",
    subtitle:"Your responses suggest few ADHD-related patterns",
    color:"#A8C5A0",
    textColor:"#2A6B4A",
    desc:"Based on your responses, you show relatively few signs associated with ADHD. Everyone experiences focus challenges sometimes — but your pattern doesn't suggest significant ADHD traits. If you're still struggling with focus, anxiety, sleep, or mood, it may be worth exploring other possibilities with a professional.",
    products:[],
  },
  inattentive:{
    title:"Primarily Inattentive Type",
    subtitle:"The 'lost in thought' pattern",
    color:"#B8A4E8",
    textColor:"#5A3EA8",
    desc:"Your responses show a strong pattern of inattentive traits — difficulty focusing, forgetfulness, losing track of tasks, and mental fatigue. This is often called 'quiet ADHD' and is frequently missed or diagnosed late, especially in women and adults. You may have spent years developing coping strategies that mask how hard things actually are for you.",
    products:["Daily Planner","Brain Dump Journal","Task Decomposer","Habit Tracker"],
  },
  hyperactive:{
    title:"Primarily Hyperactive-Impulsive Type",
    subtitle:"The 'always on' pattern",
    color:"#FFB4A2",
    textColor:"#A84A2A",
    desc:"Your responses show a strong pattern of hyperactive and impulsive traits — restlessness, emotional reactivity, impulsive decisions, and difficulty slowing down. Your brain moves fast and needs stimulation. Routine structures and reward systems tend to work well for this type.",
    products:["Dopamine Menu","Weekly Planner","Habit Tracker","Daily Gratitude"],
  },
  combined:{
    title:"Combined Type",
    subtitle:"Both inattentive and hyperactive-impulsive patterns",
    color:"#F0C070",
    textColor:"#8A6010",
    desc:"Your responses show significant traits across both dimensions — Combined Type is actually the most common ADHD presentation. You likely experience both focus difficulties and restlessness, and the intensity may shift depending on your environment, stress level, or the task at hand.",
    products:["Full ADHD Toolkit Bundle","Dopamine Menu","Daily Planner","Brain Dump Journal"],
  },
};

function getResult(answers: Record<number, number>) {
  const iQs = QUESTIONS.filter(q=>q.type==="I");
  const hQs = QUESTIONS.filter(q=>q.type==="H");
  const scoreI = iQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const scoreH = hQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const maxI = iQs.length*4;
  const maxH = hQs.length*4;
  const pI = scoreI/maxI, pH = scoreH/maxH;
  const T = 0.42;
  if(pI<T && pH<T) return "negative";
  if(pI>=T && pH<T) return "inattentive";
  if(pI<T && pH>=T) return "hyperactive";
  return "combined";
}

const C = {
  bg:"#FAFAF8", card:"#FFFFFF",
  purple:"#B8A4E8", purpleDark:"#7B5FCC", purpleLight:"#F0EBFF",
  text:"#1A1814", mid:"#6B6058", soft:"#9B8F88", border:"#E8E4DC",
};

const DISCLAIMER = `This quiz is a self-reflection tool based on DSM-5 ADHD symptom criteria. It is not a clinical assessment and cannot diagnose ADHD. A formal diagnosis requires evaluation by a licensed psychiatrist or psychologist. If your results suggest ADHD traits, please consider speaking with a mental health professional.`;

export default function ADHDQuiz() {
  const [step, setStep] = useState("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const progress = Math.round((current/QUESTIONS.length)*100);
  const q = QUESTIONS[current];

  function selectAnswer(val: number) {
    setSelected(val);
    const newAnswers = {...answers,[q.id]:val};
    setAnswers(newAnswers);
    setTimeout(()=>{
      setSelected(null);
      if(current<QUESTIONS.length-1){
        setCurrent(c=>c+1);
      } else {
        setResult(getResult(newAnswers));
        setStep("email");
      }
    },280);
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    if(!email) return;
    // Capture the lead (and trigger the result email) without blocking the UI.
    try {
      fetch("/api/quiz-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, result }),
      }).catch(()=>{});
    } catch {}
    setStep("result");
  }

  const R = result ? RESULTS[result] : null;

  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif",background:C.bg,minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px 16px"}}>
      <div style={{width:"100%",maxWidth:580}}>

        {/* INTRO */}
        {step==="intro" && (
          <div style={{background:C.card,borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}`}}>
            <div style={{background:C.purpleLight,padding:"40px 40px 32px",textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:16}}>🧠</div>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:".15em",textTransform:"uppercase",color:C.purpleDark,marginBottom:12}}>bloom focus · self-assessment</div>
              <h1 style={{fontSize:28,fontWeight:700,color:C.text,lineHeight:1.25,marginBottom:12}}>Do you have ADHD?<br/>Find your type.</h1>
              <p style={{fontSize:15,color:C.mid,lineHeight:1.7,maxWidth:420,margin:"0 auto"}}>40 questions · about 5 minutes · Based on DSM-5 ADHD criteria</p>
            </div>
            <div style={{padding:"32px 40px"}}>
              <div style={{display:"grid",gap:12,marginBottom:28}}>
                {[
                  ["🎯","What you'll learn","Whether your patterns align with ADHD — and which type fits you best"],
                  ["📋","How it works","Rate how often each statement applies to you in the past 6 months"],
                  ["🔒","What happens next","Enter your email to see your result and get personalized tool recommendations"],
                ].map(([icon,label,desc])=>(
                  <div key={label} style={{display:"flex",gap:14,alignItems:"flex-start",padding:"14px 16px",background:"#FAFAF8",borderRadius:10,border:`1px solid ${C.border}`}}>
                    <div style={{fontSize:20,flexShrink:0}}>{icon}</div>
                    <div>
                      <div style={{fontSize:13,fontWeight:600,color:C.text,marginBottom:2}}>{label}</div>
                      <div style={{fontSize:13,color:C.mid,lineHeight:1.6}}>{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
              {/* DISCLAIMER */}
              <div style={{background:"#FFF8F0",border:"1px solid #FFD6C4",borderRadius:12,padding:"16px 18px",marginBottom:24}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#A86040",marginBottom:6}}>Important notice</div>
                <p style={{fontSize:12,color:"#6B4A38",lineHeight:1.7,margin:0}}>{DISCLAIMER}</p>
              </div>
              <button onClick={()=>setStep("quiz")} style={{background:C.purpleDark,color:"#fff",border:"none",borderRadius:12,padding:"16px",fontSize:16,fontWeight:600,cursor:"pointer",width:"100%"}}>
                Start the quiz →
              </button>
            </div>
          </div>
        )}

        {/* QUIZ */}
        {step==="quiz" && (
          <div style={{background:C.card,borderRadius:20,padding:"36px 36px 32px",border:`1px solid ${C.border}`}}>
            {/* Header */}
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:12,fontWeight:600,color:q.type==="I"?C.purpleDark:"#C06040",background:q.type==="I"?C.purpleLight:"#FFF0EB",borderRadius:100,padding:"3px 10px"}}>
                {q.type==="I"?"Focus & Attention":"Energy & Impulse"}
              </span>
              <span style={{fontSize:12,color:C.soft}}>{current+1} / {QUESTIONS.length}</span>
            </div>
            {/* Progress */}
            <div style={{background:"#F0EBFF",borderRadius:100,height:5,overflow:"hidden",marginBottom:28}}>
              <div style={{height:"100%",width:`${progress}%`,background:C.purpleDark,borderRadius:100,transition:"width .35s ease"}}/>
            </div>
            {/* Question */}
            <p style={{fontSize:18,fontWeight:600,color:C.text,lineHeight:1.5,marginBottom:24,minHeight:64}}>{q.text}</p>
            {/* Options */}
            <div style={{display:"grid",gap:8,marginBottom:20}}>
              {OPTIONS.map(opt=>(
                <button key={opt.value} onClick={()=>selectAnswer(opt.value)} style={{
                  background: selected===opt.value ? C.purpleDark : answers[q.id]===opt.value ? C.purpleLight : "#FAFAF8",
                  border:`1.5px solid ${selected===opt.value?C.purpleDark:answers[q.id]===opt.value?C.purpleDark:C.border}`,
                  borderRadius:10,padding:"13px 18px",fontSize:14,
                  fontWeight: answers[q.id]===opt.value||selected===opt.value ? 600 : 400,
                  color: selected===opt.value ? "#fff" : answers[q.id]===opt.value ? C.purpleDark : C.text,
                  cursor:"pointer",textAlign:"left",transition:"all .15s",
                  display:"flex",alignItems:"center",justifyContent:"space-between",
                }}>
                  <span>{opt.label}</span>
                  {(answers[q.id]===opt.value||selected===opt.value) && <span>✓</span>}
                </button>
              ))}
            </div>
            {current>0 && (
              <button onClick={()=>setCurrent(c=>c-1)} style={{background:"transparent",border:"none",color:C.soft,fontSize:13,cursor:"pointer",padding:0}}>
                ← Previous question
              </button>
            )}
          </div>
        )}

        {/* EMAIL GATE */}
        {step==="email" && (
          <div style={{background:C.card,borderRadius:20,padding:"48px 40px",border:`1px solid ${C.border}`,textAlign:"center"}}>
            <div style={{width:64,height:64,borderRadius:"50%",background:C.purpleLight,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",fontSize:28}}>✉️</div>
            <h2 style={{fontSize:24,fontWeight:700,color:C.text,marginBottom:12}}>Your result is ready</h2>
            <p style={{fontSize:15,color:C.mid,lineHeight:1.7,marginBottom:28,maxWidth:400,margin:"0 auto 28px"}}>Enter your email to see your ADHD type, what it means, and which tools are recommended for your pattern. If your result shows ADHD traits, you'll also receive an exclusive discount.</p>
            <form onSubmit={handleEmail} style={{display:"grid",gap:12,textAlign:"left"}}>
              <input value={name} onChange={e=>setName(e.target.value)} placeholder="First name (optional)" style={{background:"#FAFAF8",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"14px 16px",fontSize:15,fontFamily:"inherit",outline:"none",color:C.text}}/>
              <input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email address" style={{background:"#FAFAF8",border:`1.5px solid ${C.border}`,borderRadius:10,padding:"14px 16px",fontSize:15,fontFamily:"inherit",outline:"none",color:C.text}}/>
              <button type="submit" style={{background:C.purpleDark,color:"#fff",border:"none",borderRadius:12,padding:"16px",fontSize:16,fontWeight:600,cursor:"pointer"}}>
                See my result →
              </button>
            </form>
            <p style={{fontSize:11,color:C.soft,marginTop:14}}>No spam. Unsubscribe anytime.</p>
          </div>
        )}

        {/* RESULT */}
        {step==="result" && R && (
          <div style={{display:"grid",gap:16}}>
            {/* Result card */}
            <div style={{background:C.card,borderRadius:20,overflow:"hidden",border:`1px solid ${C.border}`}}>
              <div style={{background:R.color+"22",borderTop:`4px solid ${R.color}`,padding:"32px 36px"}}>
                <div style={{display:"inline-block",background:R.color+"33",borderRadius:100,padding:"4px 14px",fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:R.textColor,marginBottom:16}}>
                  Your result
                </div>
                <h2 style={{fontSize:26,fontWeight:700,color:C.text,lineHeight:1.2,marginBottom:6}}>{R.title}</h2>
                <p style={{fontSize:14,fontWeight:600,color:R.textColor,marginBottom:20}}>{R.subtitle}</p>
                <p style={{fontSize:15,color:C.mid,lineHeight:1.8}}>{R.desc}</p>
              </div>
              {/* Disclaimer in result */}
              <div style={{padding:"20px 36px",background:"#FFF8F0",borderTop:"1px solid #FFD6C4"}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:"#A86040",marginBottom:6}}>
                  Please remember
                </div>
                <p style={{fontSize:12,color:"#6B4A38",lineHeight:1.7,margin:0}}>
                  This quiz is a self-reflection tool and <strong>cannot diagnose ADHD</strong>. A formal diagnosis requires evaluation by a licensed psychiatrist or psychologist. These results are meant to help you understand yourself better — not to replace professional assessment. If you recognize yourself in these patterns, consider speaking with a mental health professional.
                </p>
              </div>
            </div>

            {/* Products */}
            {R.products.length>0 && (
              <div style={{background:C.purpleLight,borderRadius:20,padding:"28px 36px",border:`1px solid ${C.purpleDark}22`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:16}}>
                  Recommended for your type
                </div>
                <div style={{display:"grid",gap:8,marginBottom:24}}>
                  {R.products.map((p: string,i: number)=>(
                    <div key={i} style={{background:"#fff",borderRadius:10,padding:"12px 16px",display:"flex",alignItems:"center",gap:10,fontSize:14,color:C.text,fontWeight:500}}>
                      <span style={{color:C.purpleDark,fontWeight:700}}>→</span>{p}
                    </div>
                  ))}
                </div>
                <div style={{background:C.purpleDark,borderRadius:12,padding:"16px 20px",textAlign:"center",marginBottom:16}}>
                  <p style={{fontSize:12,color:"rgba(255,255,255,.65)",margin:"0 0 4px"}}>Your exclusive discount — also sent to your email</p>
                  <p style={{fontSize:24,fontWeight:700,color:"#fff",letterSpacing:".12em",margin:"0 0 4px"}}>BLOOM15</p>
                  <p style={{fontSize:11,color:"rgba(255,255,255,.5)",margin:0}}>15% off your first order</p>
                </div>
                <a href="https://bloomfocus.org/shop" style={{display:"block",background:C.purpleDark,color:"#fff",borderRadius:12,padding:"15px",fontSize:15,fontWeight:600,cursor:"pointer",textAlign:"center",textDecoration:"none"}}>
                  Shop bloom focus →
                </a>
              </div>
            )}

            <button onClick={()=>{setStep("intro");setCurrent(0);setAnswers({});setEmail("");setResult(null);setSelected(null);}} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",fontSize:13,color:C.soft,cursor:"pointer"}}>
              Retake the quiz
            </button>
          </div>
        )}

        <p style={{textAlign:"center",fontSize:11,color:C.soft,marginTop:16}}>bloomfocus.org · For self-reflection only · Not a clinical tool</p>
      </div>
    </div>
  );
}
