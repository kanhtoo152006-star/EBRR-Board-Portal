import { REST, HEADERS } from './api'
import { useEffect, useState } from "react";
import Stepper from './Stepper'
import ResultCard from './ResultCard'
import './ResultPage.css'

export default function ResultPage() {

    const [examId, setExamId] = useState('')
    const [yearId, setYearId] = useState('')
    const [gradeId, setGradeId] = useState('')
    const [roll, setRoll] = useState('')

    const [exams, setExams] = useState([])
    const [years, setYears] = useState([])
    const [grades, setGrades] = useState([])

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const currentStep = !examId ? 1 : !yearId ? 2 : !gradeId ? 3 : 4
    const allComplete = !!examId && !!yearId && !!gradeId && !!roll.trim()

    const selectedGrade = grades.find (g => g.id === gradeId)
    const registrationRequired = selectedGrade?.registration_required ?? true

    const [regNo, setRegNo] = useState('')
    const [result, setResult] = useState(null)

    const isSearchEnabled = 
    !!examId &&
    !!yearId &&
    !!gradeId &&
    !!roll.trim() &&
    (!registrationRequired || !!regNo.trim())

    useEffect(() => {
        const fetchExams = async() => {
            try {
                const res = await fetch (
                    `${REST}/examinations?select=*`,
                    {headers : HEADERS}
                )
                if (!res.ok) throw new Error (`HTTP ${res.status}`)
                const data = await res.json()
                setExams(data)
                // console.log('exams:', data) 
            } catch(err) {
                setError('Failed to load examination')
            }
        }
        fetchExams();
    },[])

    useEffect(() => {
        if (!examId) return
        const fetchYears = async() => {
            try {
                const res = await fetch (
                   `${REST}/academic_years?select=*&examination_id=eq.${examId}`,
                   {headers: HEADERS} 
                )
                if (!res.ok) throw new Error(`HTTP ${res.status}`)
                    const data = await res.json()
                    setYears(data)
            } catch(err) {
                setError('Failed to loade Academic Year')
            }
        }
        fetchYears();
    },[examId])

    useEffect(() => {
        if(!yearId) return
        const fetchGrades = async() => {
            try{
              const res = await fetch (
                `${REST}/grades?select=*&examination_id=eq.${examId}&academic_year_id=eq.${yearId}`,
                {headers : HEADERS}
              )
              if(!res.ok) throw new Error (`HTTP ${res.status}`)
                const data = await res.json()
                setGrades(data)
            } catch(err){
                setError('Failed to load Grades')
            }
        }
        fetchGrades();
    },[yearId])

    const handleSearch = async() => {
        setLoading(true)
        setResult(null)
        setError(null)

        try {
            const params = new URLSearchParams({
                'grade_id':`eq.${gradeId}`,
                'roll_number' : `eq.${roll}`
            })

            if(registrationRequired && regNo){
                params.append('registration_no', `eq.${regNo}`)
            }

            const res = await fetch(
                `${REST}/results?select=*&${params}`,
                {headers : HEADERS}
            )

            if(!res.ok) throw new Error (`HTTP ${res.status}`)
                const data = await res.json()
            if(data.length === 0) {
                setError('No result found for this student')
            } else {
                setResult(data[0])
            }
        } catch (err) {
            setError(err.message || 'connection error or please try again.')
        }

        finally {
            setLoading(false)
        }
    }

    return (

        <div className='page'>
            <div className='main-layout'>
                <div className='left-panel'>
                    {/* Badge */}
                <div className="secure-badge">
                    SECURE REGISTRY PORTAL
                    </div>

                    {/* Hero text */}
                    <h1 className="hero-title">
                        Find your official <span className="hero-green">exam result.</span>
                    </h1>

                    {/* Description */}
                    <p className="hero-desc">
                        Enter your credentials below to securely fetch and verify 
                        certificate outcomes directly from the official EBRR registry database.
                    </p>
                        <Stepper currentStep={currentStep} allComplete={allComplete} />
                </div>

                <div className='right-panel'>
                  <div className='form-card'>
                  <h2 className='form-title'>Student Result Search</h2>
                  <div className="form">
                <div>
                    {/* Dropdown 1 — Examination */}
                    <div className='field'>
                        <label>Examination Name</label>
                    <select value={examId} onChange={e => setExamId(e.target.value)}>
                    <option value="">Select an Examination</option>
                    {exams.map(exam => (
                        <option key={exam.id} value={exam.id}>{exam.name}</option>
                    ))} 
                    </select>
                    </div>

                    {/* Dropdown 2 — Academic Year */}
                    <div className='field'>
                        <label>Academic Year</label>
                    <select value={yearId} onChange={e => setYearId(e.target.value)} disabled={!examId}>
                    <option value="">Choose an examination first</option>
                    {years.map(year => (
                        <option key={year.id} value={year.id}>{year.year_label}</option>
                    ))}
                    </select>
                    </div>

                    {/* Dropdown 3 — Grade */}
                    <div className='field'>
                        <label>Grade/Class</label>
                    <select value={gradeId} onChange={e => setGradeId(e.target.value)} disabled={!yearId}>
                    <option value="">Choose academic year first</option>
                    {grades.map(grade => (
                        <option key={grade.id} value={grade.id}>{grade.grade_label}</option>
                    ))}
                    </select>
                    </div>

                    {/* Roll Number*/}
                    <div className='field'>
                    <label>Roll Number</label>
                        <input
                        type="text"
                        value={roll}
                        onChange={e => setRoll(e.target.value)}
                        placeholder="Enter roll number"
                        />
                    </div>
                    
                    {/* Registration No.*/}
                    <div className='field'>
                    <label>EBRR Registration No.
                        {!registrationRequired && ' (Optional)'}
                    </label>
                        <input
                        type="text" 
                        value={regNo}
                        onChange={e => setRegNo(e.target.value)}
                        placeholder='Enter Registration Number'
                        required = {registrationRequired}
                        />
                    </div>

                        <button disabled = {!isSearchEnabled || loading} onClick={handleSearch}>
                            {loading? 'Searching...' : 'Search Result'}
                        </button>
                      </div>
                    </div>
                    </div>

                    {error && <div className="error-message">{error}</div>}
                    {result && <ResultCard data={result} />}
                </div>
            </div>
        </div>
    )
}