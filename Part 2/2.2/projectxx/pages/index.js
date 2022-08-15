import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import TodoCreator from './components/todoCreator'
import TodoList from './components/todoList'
import axios from 'axios';

export default function Home() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get(`/api/todos`)
    .then(s => setTodos(s.data))
    .catch(err => console.log(err))
  }, []);

  const newTodoCreated = (newTodo) => {
    setTodos(todos.concat(newTodo));
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main} style={{width: '100%', 'align-items': 'flex-start'}}>
        <Image alt="Muk" src="/api/image" width="350" height="200" />
        <TodoCreator setTodos={newTodoCreated}/>
        <TodoList todos={todos}/>
      </main>
    </div>
  )
}