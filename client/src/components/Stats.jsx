import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import "./Stats.css"

function Counter({ target, suffix }){

const [count,setCount] = useState(0)

useEffect(()=>{

let start = 0
const duration = 2000
const increment = target / (duration / 16)

const timer = setInterval(()=>{

start += increment

if(start >= target){
start = target
clearInterval(timer)
}

setCount(Math.floor(start))

},16)

return () => clearInterval(timer)

},[target])

return(
<h2 className="stat-number">
{count}{suffix}
</h2>
)

}

function Stats(){

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const statsList = [
    { target: 982, suffix: "+", label: "Students Trained" },
    { target: 17, suffix: "+", label: "Japanese Company Tie-ups" },
    { target: 15, suffix: "+", label: "Years Teaching Experience" },
    { target: 320, suffix: "+", label: "Students Placed in Japan" }
  ];

  return(

    <section className="stats">

      {/* SECTION HEADER */}
      <motion.div 
        className="stats-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h2>
          Our <span>Impact</span> in Numbers
        </h2>
        <p>
          Thousands of students have trusted ASAHI to start their Japanese language journey 
          and build careers in Japan.
        </p>
      </motion.div>

      <motion.div 
        className="stats-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.15 }}
      >
        {statsList.map((stat, i) => (
          <motion.div className="stat-card" key={i} variants={cardVariants}>
            <Counter target={stat.target} suffix={stat.suffix} />
            <p>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

    </section>

  )

}

export default Stats