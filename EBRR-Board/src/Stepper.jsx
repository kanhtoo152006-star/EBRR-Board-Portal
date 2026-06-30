import "./Stepper.css"

export default function Stepper ({currentStep, allComplete}) {
  const steps = [
    {number: 1, label : 'Choose Examination'},
    {number: 2, label : 'Choose Academic Year'},
    {number: 3, label : 'Choose Grades'},
    {number: 4, label : 'Search Result'},
  ]

  function getState (stepNumber) {
     if (allComplete) return 'checkmark'
     if (stepNumber < currentStep) return 'completed'
     if (stepNumber === currentStep) return 'active'
     return 'inactive'
  }

  return (
    <div className="stepper">
       {steps.map(step=> (
         <div key={step.number} className={`step ${getState(step.number)}`}>
           <div className="step-circle">
            {getState(step.number) === 'checkmark' || getState(step.number) === 'completed' ? '✓'
            : String(step.number). padStart(2, '0')}
           </div>
           <div className="step-label">{step.label}</div>
         </div>
       ))}
       
    </div>
  )
}