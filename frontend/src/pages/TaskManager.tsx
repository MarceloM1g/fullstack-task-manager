import { useEffect, useState } from 'react';
import type { Task } from '../types/Task';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function TaskManager() {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [idToEdit, setIdToEdit] = useState<number | null>(null);

  const [editInputTitle, setEditInputTitle] = useState('');
  const [editInputDescription, setEditInputDescription] = useState('');

  const [isLoading, setIsLoading] = useState(true);

  // Username
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    async function loadInitialData() {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          navigate('/login');
          return;
        }

        const [tasksResponse, userResponse] = await Promise.all([

          fetch('https://fullstack-task-manager-x8w5.onrender.com/tasks', {
            headers: { Authorization: `Bearer ${token}` }
          }),

          fetch('https://fullstack-task-manager-x8w5.onrender.com/user', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        if (!tasksResponse.ok) {
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        if (!userResponse.ok) {
          throw new Error(`Erro HTTP: ${userResponse.status}`);
        }

        const [tasks, user] = await Promise.all([
          tasksResponse.json(),
          userResponse.json()
        ]);

        setTaskList(tasks);
        setUserName(user.name);

      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, [navigate]);

  function handleTitleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  function handleDescriptionInput(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.currentTarget.value);
  }

  function handleEditInputTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputTitle(e.currentTarget.value);
  }

  function handleEditInputDescription(e: React.ChangeEvent<HTMLInputElement>) {
    setEditInputDescription(e.currentTarget.value);
  }

  async function addTask() {
    if (title.trim() === '' || description.trim() === '') return;

    try {
      // Pegar token salvo
      const token = localStorage.getItem('token');
      // Verifica se ele existe
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('https://fullstack-task-manager-x8w5.onrender.com/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Enviando o Token
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
      });

      if (!response.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      const newTask = await response.json();
      console.log('Tarefa Criada', newTask);

      setTaskList((prev) => [...prev, newTask]);

      setTitle('');
      setDescription('');

    } catch (error) {
      console.log(error);
    }
  }

  async function deleteTask(id: number) {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`https://fullstack-task-manager-x8w5.onrender.com/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erro ao deletar task');
      }

      setTaskList((prev) =>
        prev.filter((task) => task.id !== id)
      );

    } catch (error) {
      console.log(error);
    }
  }

  function editTask(id: number) {
    const task = taskList.find(t => t.id === id);
    if (!task) return;

    setEditInputTitle(task.title);
    setEditInputDescription(task.description);
    setIdToEdit(id);
  }

  async function saveTask() {
    if (editInputTitle.trim() === '' || editInputDescription.trim() === '' || idToEdit === null) return;

    try {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`https://fullstack-task-manager-x8w5.onrender.com/tasks/${idToEdit}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: editInputTitle,
          description: editInputDescription
        })
      });

      if (!response.ok) {
        throw new Error('Erro ao editar task');
      }

      setTaskList((prev) =>
        prev.map((task) => {
          if (task.id === idToEdit) {
            return {
              ...task,
              title: editInputTitle,
              description: editInputDescription
            }
          }
          return task;
        })
      );

    } catch (error) {
      console.log(error);
    }

    setIdToEdit(null);

    setEditInputTitle('');
    setEditInputDescription('');
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#1e2d3d] border-t-[#3b9eff] rounded-full animate-spin" />
          <p className="text-sm text-[#4a6480] tracking-wide">Carregando Tasks...</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="w-full max-w-xl mb-4">
        <h1 className="text-3xl font-bold text-white">
          Olá, <span className="text-blue-400">{userName}</span>
        </h1>

        <p className="text-sm text-gray-400 mt-1">
          Gerencie suas tasks facilmente
        </p>
      </div>

      <div className="bg-slate-800 p-6 rounded-2xl shadow-md w-full max-w-xl">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Tasks
        </h1>

        <h1>Título</h1>
        <input
          type="text"
          placeholder="Título da Missão"
          onChange={handleTitleInput}
          value={title}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          className="w-full px-4 py-3 rounded-xl bg-gray-900 
                 focus:bg-gray-900 border border-gray-700 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                 outline-none transition-all duration-200
                 placeholder-gray-400 mb-5"
        />

        <h1>Descrição</h1>
        <input
          type='text'
          placeholder='Descrição da Missão'
          onChange={handleDescriptionInput}
          value={description}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          className='w-full px-4 py-3 rounded-xl bg-gray-900 
                 focus:bg-gray-900 border border-gray-700 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                 outline-none transition-all duration-200
                 placeholder-gray-400 mb-5'
        />

        <button
          className='w-full
                  bg-[#3b9eff]
                  hover:bg-blue-500
                  text-white
                  font-semibold
                  py-3
                  rounded-full
                  transition-all
                  duration-200
                  shadow-lg'
          onClick={addTask}>Adicionar
        </button>
      </div>

      <div id='content' className='bg-slate-800 p-6 rounded-2xl shadow-md w-full max-w-xl mt-5'>
        <ul>
          {taskList.length === 0 ? (
            <p>Nenhuma task ainda... que tal começar uma?</p>
          ) : (
            taskList.map((task) => (
              <li
                key={task.id}
                className="group relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border border-white/5 text-white p-5 rounded-2xl mb-3 flex flex-col gap-4 shadow-lg hover:shadow-xl hover:border-white/10 transition-all duration-300"
              >

                <div className="pl-2">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-0.5">
                    Título
                  </p>
                  <h2 className="text-base font-semibold leading-snug text-white">
                    {task.title}
                  </h2>
                </div>

                <div className="pl-2">
                  <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500 mb-0.5">
                    Descrição
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {task.description}
                  </p>
                </div>

                <div className="flex justify-end gap-2 pt-1 border-t border-white/5">
                  <button
                    onClick={() => editTask(task.id)}
                    className="flex items-center gap-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 hover:border-blue-600 px-4 py-1.5 rounded-lg text-base font-medium transition-all duration-200"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 hover:border-red-500 px-4 py-1.5 rounded-lg text-base font-medium transition-all duration-200"
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Se "idToEdit" for diferente de null, a condição é verdadeira e o modal é exibido */}
      {idToEdit !== null && (
        /* Quando o usuário clicar fora do input, a variavel "idToEdit" vai receber o valor "null". 
          Assim fazendo não satisfazendo a condição acima e sumindo o modal */
        <div onClick={() => {
          setIdToEdit(null);
          setEditInputTitle('');
          setEditInputDescription('');
        }} className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div onClick={(e) => e.stopPropagation()} className="bg-gray-700 p-4 rounded-2xl shadow">
            <h1>Título</h1>
            <input
              type="text"
              className="border p-2 mr-2 rounded-xl bg-gray-700 text-gray-100"
              onChange={handleEditInputTitle}
              value={editInputTitle}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTask();
                }
              }}
            />

            <h1>Descrição</h1>
            <input
              type="text"
              className="border p-2 mr-2 rounded-xl bg-gray-700 text-gray-100"
              onChange={handleEditInputDescription}
              value={editInputDescription}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveTask();
                }
              }}
            />
            <button onClick={() => saveTask()} className="bg-blue-800 text-white px-3 py-1 rounded-full">
              Salvar
            </button>
          </div>
        </div>
      )}

    </Layout>
  )
}

export default TaskManager;