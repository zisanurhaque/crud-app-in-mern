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
    }else if(email === ''){
      alert("Email Field Is Empty")
    }else if(dept === ''){
      alert("Department Field Is Empty")
    }else{
      axios.post('/add', value);
      setName('')
      setEmail('')
      setDept('')
      setCalert('New Student Added Successfully')
      setToggle(true)
      setTimeout(() => {
        setToggle(false)
      }, 2000)
    }
  }

  const handleDelete = (id) => {
    axios.delete(`/studetns/${id}`)
    setCalert('Student Deleted')
      setToggle(true)
      setTimeout(() => {
        setToggle(false)
      }, 2000)
  }

  const handleUpdate = async (id) => {
    const res = await axios.get(`/single/${id}`)
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
    axios.put(`/update/${id}`, value)
    
    setName('')
    setEmail('')
    setDept('')
    setBtn(false)
    setCalert('Student Updated Successfully')
      setToggle(true)
      setTimeout(() => {
        setToggle(false)
      }, 2000)
  }

  useEffect(() => {
      axios.get("/get").then(response => {
        return setStudents(response.data.students)
      })
  }, [students])
  
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
        <table>
          <tr>
            <th className='sr'>Sr</th>
            <th className='st'>Student</th>
            <th className='em'>Email</th>
            <th className='dp'>Department</th>
            <th className='up'>Update</th>
            <th className='dl'>Delete</th>
          </tr>
          <Scrollbars style={{ height: 240 }}>
          {
            students.map((item, index) => (
              <tr key={item._id}>
                <td className='sr'>{index + 1}</td>
                <td className='st'>{item.name}</td>
                <td className='em'>{item.email}</td>
                <td className='dp'>{item.dept}</td>
                <td className='up'><button className='update' onClick={() => handleUpdate(item._id)}>Update</button></td>
                <td className='dl'><button className='delete' onClick={() => handleDelete(item._id)}>Delete</button></td>
              </tr>
            ))
          }
          </Scrollbars>
        </table>
      </div>
    </div>
  );
}

export default App;