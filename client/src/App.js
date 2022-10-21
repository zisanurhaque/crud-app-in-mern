import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const App = () => {

  const [students, setStudents] = useState([])
  const [id, setId] = useState()
  const [btn, setBtn] = useState(false)
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dept, setDept] = useState('');

  const [calert, setCalert] = useState('')
  const [toggle, setToggle] = useState(false)

  const handleName = (e) => {
    
    setName(e.target.value);

  }

  const handleEmail = (e) => {

    setEmail(e.target.value);

  }
  
  const handleDept = (e) => {

    setDept(e.target.value); 

  }

  const handleSubmit = (e) => {

    e.preventDefault()

    const value = {
      name: name,
      email: email,
      dept: dept
    }

    if(name === '' && email === '' && dept === ''){
      alert("All Field Is Empty")
    }
    else if(name === ''){
      alert("Name Field Is Empty")
    }
    else if(email === ''){
      alert("Email Field Is Empty")
    }
    else if(dept === ''){
      alert("Department Field Is Empty")
    }
    else{
      axios.post('https://crud-zisanurhaque.herokuapp.com/add', value);
      setName('')
      setEmail('')
      setDept('')
      setCalert('New Student Added Successfully')
      setToggle(true)
      setTimeout(() => {
        setToggle(false)
        window.location.href="/"
      }, 2000)
    }

  }

  const handleDelete = (id) => {

    axios.delete(`https://crud-zisanurhaque.herokuapp.com/studetns/${id}`)
    setCalert('Student Deleted')
    setToggle(true)
    setTimeout(() => {
      setToggle(false)
      window.location.href="/"
    }, 2000)

  }

  const handleUpdate = async (id) => {

    const res = await axios.get(`https://crud-zisanurhaque.herokuapp.com/single/${id}`)
    setName(res.data.single.name)
    setEmail(res.data.single.email)
    setDept(res.data.single.dept)
    setId(id)
    setBtn(true)

  }

  const handleUpdateData = (e) => {

    e.preventDefault()

    const value = {
      name: name,
      email: email,
      dept: dept
    }

    axios.put(`https://crud-zisanurhaque.herokuapp.com/update/${id}`, value)
    
    setName('')
    setEmail('')
    setDept('')
    setBtn(false)
    setCalert('Student Updated Successfully')
    setToggle(true)
    setTimeout(() => {
      setToggle(false)
      window.location.href="/"
    }, 2000)
  }

  useEffect(() => {

      axios.get("https://crud-zisanurhaque.herokuapp.com/get").then(response => {
        return setStudents(response.data.students)
      })

  }, [])
  
  return (
    <div className='home'>
      <div className='section'>
        <div className='sectionHeader'>
          {
            btn === false ? "Add Student" : "Update Student"
          }
        </div>
        <form>
          <input type="text" defaultValue={name} placeholder="Students Name" name="name" onChange={(e) => handleName(e)}/>
          <input type="text" defaultValue={email} placeholder="Email" name="email" onChange={(e) => handleEmail(e)}/>
          <input type="text" defaultValue={dept} placeholder="Department" name="dept" onChange={(e) => handleDept(e)}/>
          {
            btn === false ? <button type='submit' className='formBtn' onClick={(e) => handleSubmit(e)}>Submit</button> : <button type='submit' className='formBtn' onClick={(e) => handleUpdateData(e)}>Update</button>
          }
          {
            toggle === true ? <p className='customAlert'>{calert}</p> : null
          }

        </form>
      </div>
      <div className='section user'>
        <div className='sectionHeader'>
          All Students
        </div>
        <div className='table'>
          <div className='tr'>
            <div className='th sr'>Sr</div>
            <div className='th st'>Student</div>
            <div className='th em'>Email</div>
            <div className='th dp'>Department</div>
            <div className='th up'>Update</div>
            <div className='th dl'>Delete</div>
          </div>
          <Scrollbars style={{ height: 240 }}>
          {
            students.map((item, index) => (
              <div className='tr fortd' key={item._id}>
                <div className='td sr'>{index + 1}</div>
                <div className='td st'>{item.name}</div>
                <div className='td em'>{item.email}</div>
                <div className='td dp'>{item.dept}</div>
                <div className='td up'><button className='update' onClick={() => handleUpdate(item._id)}>Update</button></div>
                <div className='td dl'><button className='delete' onClick={() => handleDelete(item._id)}>Delete</button></div>
              </div>
            ))
          }
          </Scrollbars>
        </div>
      </div>
    </div>
  );
}

export default App;