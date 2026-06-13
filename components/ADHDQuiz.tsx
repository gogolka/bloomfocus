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
    desc:"Based on your responses, you show relatively few of the patterns associated with ADHD. Everyone struggles with focus, restlessness, or motivation from time to time, and that is completely normal. Your answers simply don't point to a consistent, pervasive pattern across many areas of your life, which is what ADHD usually looks like.",
    strategies:[
      "Protecting your sleep, movement, and downtime, since focus and mood rest on those foundations more than most people realise.",
      "Using a single place to capture tasks and ideas, so your mind isn't doing the work of remembering everything.",
      "Breaking big or boring tasks into smaller steps whenever they start to feel heavy.",
      "Noticing which environments help you concentrate, and shaping more of your day around them.",
    ],
    nextSteps:"If you're still struggling with focus, energy, sleep, anxiety, or mood despite this result, that struggle is real and worth taking seriously. Many things other than ADHD can affect attention, and a conversation with a doctor or therapist can help you find what's actually going on.",
    products:[],
  },
  inattentive:{
    title:"Primarily Inattentive Type",
    subtitle:"The 'lost in thought' pattern",
    color:"#B8A4E8",
    textColor:"#5A3EA8",
    desc:"Your responses show a strong pattern of inattentive traits — difficulty sustaining focus, forgetfulness, losing track of tasks, and mental fatigue. This presentation is often called 'quiet ADHD' because there is little outward hyperactivity, and it is frequently missed or diagnosed late, especially in women and adults. You may have spent years quietly building coping strategies that hide just how much effort everyday focus actually takes you.",
    desc2:"This is not a matter of laziness or low intelligence. Your attention system is wired to follow interest and novelty rather than importance, which is why you can disappear into something you love for hours and yet stall completely on a task that feels dull, even when you genuinely want to do it.",
    strengths:[
      "Deep, immersive focus on things that genuinely interest you, where you can do remarkable work.",
      "Creative, associative thinking that links ideas other people don't see as connected.",
      "Strong empathy and sensitivity to what the people around you are feeling.",
      "A rich inner world and a natural pull toward big-picture, conceptual thinking.",
    ],
    challenges:[
      "Starting tasks, even ones you actually want to do, and seeing them through to the finish.",
      "Holding several steps in mind at once, which makes complex tasks feel overwhelming fast.",
      "Time blindness — consistently underestimating how long things will take.",
      "Forgetting appointments, everyday details, and where you put important things.",
      "Tiredness that comes from masking how hard sustained attention really is for you.",
    ],
    strategies:[
      "Shrinking the first step until it feels almost too small to skip, so starting takes no willpower.",
      "Moving your memory out of your head and into one trusted capture inbox for everything.",
      "Working alongside someone, even on a video call, so their presence anchors your focus.",
      "Making reminders and deadlines visible in your space, because out of sight truly means out of mind.",
      "Using short, gentle focus blocks with real breaks instead of forcing long stretches.",
    ],
    nextSteps:"Because inattentive ADHD is so easily overlooked, many people reach adulthood without ever being recognised. If you saw yourself again and again in these questions, it is worth bringing this result to a psychiatrist or psychologist who can do a proper evaluation and talk through your options.",
    products:["Daily Planner","Brain Dump Journal","Task Decomposer","Habit Tracker"],
  },
  hyperactive:{
    title:"Primarily Hyperactive-Impulsive Type",
    subtitle:"The 'always on' pattern",
    color:"#FFB4A2",
    textColor:"#A84A2A",
    desc:"Your responses show a strong pattern of hyperactive and impulsive traits — restlessness, emotional intensity, fast decisions, and real difficulty slowing down. Your brain moves quickly and craves stimulation, so quiet, repetitive, or low-reward situations are the ones that feel hardest. Structure, movement, and reward systems tend to work especially well for this presentation.",
    desc2:"The same wiring that makes it hard to sit still and wait also gives you momentum, courage, and the ability to act when others freeze. The goal isn't to suppress that energy but to give it good places to go, so it works for you instead of against you.",
    strengths:[
      "High energy and drive that can carry you through work other people find draining.",
      "Spontaneity and courage to take action and start things while others are still hesitating.",
      "Quick thinking and a real talent for improvising under pressure.",
      "Warmth and enthusiasm that naturally draws other people toward you.",
    ],
    challenges:[
      "An internal restlessness that makes slowing down and truly relaxing genuinely difficult.",
      "Speaking or acting before fully thinking it through, then wishing you had waited.",
      "Emotional reactions that arrive fast and feel bigger than the moment seems to call for.",
      "Boredom and a constant hunger for stimulation that makes routine tasks feel unbearable.",
      "Impulsive choices around spending, plans, or commitments you later reconsider.",
    ],
    strategies:[
      "Spending your restless energy through movement before and between focus blocks.",
      "Building a deliberate pause into big decisions and purchases, even a single night to sleep on it.",
      "Wrapping routine tasks in reward and novelty so they feel worth your attention.",
      "Setting up structure and external guardrails so the good choice is also the easy one.",
      "Naming each emotion as it rises, which gradually takes the edge off its intensity.",
    ],
    nextSteps:"If these patterns have followed you across different parts of your life and over many years, a psychiatrist or psychologist can help you understand them properly. A real evaluation opens up options — from practical strategies to other forms of support — that are hard to access on your own.",
    products:["Dopamine Menu","Weekly Planner","Habit Tracker","Daily Gratitude"],
  },
  combined:{
    title:"Combined Type",
    subtitle:"Both inattentive and hyperactive-impulsive patterns",
    color:"#F0C070",
    textColor:"#8A6010",
    desc:"Your responses show significant traits across both dimensions, and Combined Type is actually the most common ADHD presentation. You likely live with both the focus difficulties of the inattentive pattern and the restlessness of the hyperactive-impulsive one, and which side shows up most can shift with your environment, your stress level, and the task in front of you.",
    desc2:"Living with both can feel contradictory — your mind races and goes blank, you crave stimulation and get overwhelmed by it. That mix is exactly why a flexible toolkit matters more than any single trick: different days and different tasks will call for different tools.",
    strengths:[
      "Bursts of deep hyperfocus paired with the energy and drive to act on your ideas.",
      "Creative, fast, associative thinking that generates a lot of possibilities quickly.",
      "Empathy and spontaneity that make you engaging and genuinely fun to be around.",
      "Big-picture vision combined with a real willingness to dive in and start.",
    ],
    challenges:[
      "Both stalling on tasks and feeling too restless to settle, sometimes within the same hour.",
      "Managing a mind that can race and feel blank depending on the moment.",
      "Following through once the initial novelty and excitement wear off.",
      "Strong emotions and time blindness layered on top of focus difficulties.",
      "Feeling pulled in several directions at once and struggling to choose where to start.",
    ],
    strategies:[
      "Keeping one capture inbox for everything, so nothing depends on you remembering it.",
      "Breaking tasks into very small first steps to get past the hardest moment, the start.",
      "Using movement to discharge restlessness before you sit down to focus.",
      "Adding reward and novelty to dull tasks so your brain has a reason to engage.",
      "Leaning on visible structure and gentle external accountability rather than willpower alone.",
    ],
    nextSteps:"Combined Type can be a lot to carry, precisely because it pulls from both directions. If you recognised yourself throughout this quiz, please consider bringing the result to a psychiatrist or psychologist. A proper assessment can make sense of the whole picture and point you toward support that actually fits.",
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

function getScores(answers: Record<number, number>) {
  const iQs = QUESTIONS.filter(q=>q.type==="I");
  const hQs = QUESTIONS.filter(q=>q.type==="H");
  const scoreI = iQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  const scoreH = hQs.reduce((s,q)=>s+(answers[q.id]||0),0);
  return {
    pI: Math.round((scoreI/(iQs.length*4))*100),
    pH: Math.round((scoreH/(hQs.length*4))*100),
  };
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
  const [scores, setScores] = useState<{pI:number;pH:number} | null>(null);
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
        setScores(getScores(newAnswers));
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
                {R.desc2 && <p style={{fontSize:15,color:C.mid,lineHeight:1.8,marginTop:14}}>{R.desc2}</p>}
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

            {/* Score breakdown */}
            {scores && (
              <div style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:16}}>How your answers broke down</div>
                {[["Inattentive traits",scores.pI,"#B8A4E8"],["Hyperactive-impulsive traits",scores.pH,"#FFB4A2"]].map((row:any,i:number)=>(
                  <div key={i} style={{marginBottom:i===0?16:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:13,color:C.text,marginBottom:6}}>
                      <span>{row[0]}</span><span style={{fontWeight:700,color:C.mid}}>{row[1]}%</span>
                    </div>
                    <div style={{background:"#F0EBFF",borderRadius:100,height:10,overflow:"hidden"}}>
                      <div style={{height:"100%",width:`${row[1]}%`,background:row[2],borderRadius:100}}/>
                    </div>
                  </div>
                ))}
                <p style={{fontSize:12,color:C.soft,lineHeight:1.7,marginTop:16,marginBottom:0}}>These percentages show how strongly each set of traits came through in your answers. They are a reflection of this quiz, not a clinical score.</p>
              </div>
            )}

            {/* Detailed sections */}
            {[
              R.strengths && {label:"Your strengths",emoji:"🌟",items:R.strengths,color:"#5E9E4A"},
              R.challenges && {label:"Where it tends to get hard",emoji:"🌧",items:R.challenges,color:"#C07A3E"},
              R.strategies && {label:"What helps your type",emoji:"🛠",items:R.strategies,color:C.purpleDark},
            ].filter(Boolean).map((sec:any,i:number)=>(
              <div key={i} style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:sec.color,marginBottom:16}}>{sec.emoji} {sec.label}</div>
                <div style={{display:"grid",gap:10}}>
                  {sec.items.map((it:string,j:number)=>(
                    <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:C.text,lineHeight:1.6}}>
                      <span style={{color:sec.color,fontWeight:700,flexShrink:0,marginTop:1}}>›</span><span>{it}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Next steps */}
            {R.nextSteps && (
              <div style={{background:C.card,borderRadius:20,padding:"24px 28px",border:`1px solid ${C.border}`}}>
                <div style={{fontSize:11,fontWeight:700,letterSpacing:".1em",textTransform:"uppercase",color:C.purpleDark,marginBottom:12}}>What you can do next</div>
                <p style={{fontSize:14,color:C.mid,lineHeight:1.8,margin:0}}>{R.nextSteps}</p>
              </div>
            )}

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

            <button onClick={()=>{setStep("intro");setCurrent(0);setAnswers({});setEmail("");setResult(null);setScores(null);setSelected(null);}} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:10,padding:"12px",fontSize:13,color:C.soft,cursor:"pointer"}}>
              Retake the quiz
            </button>
          </div>
        )}

        <p style={{textAlign:"center",fontSize:11,color:C.soft,marginTop:16}}>bloomfocus.org · For self-reflection only · Not a clinical tool</p>
      </div>
    </div>
  );
}
