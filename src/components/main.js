import React, { Component } from "react";

import Form from './Form';
import Tarefas from './Tarefas';
import './main.css';



export default class Main extends Component{
    state = {
            novaTarefa: '',
            tarefas:[],
            index: -1,
        };

        componentDidMount(){
            const tarefas = JSON.parse(localStorage.getItem('tarefas'));
            if (!tarefas) return;
            this.setState({tarefas});
        }   

        componentDidUpdate(prevProps, prevState){
            const{tarefas} = this.state;
            if(tarefas === prevState.tarefas) return;

            localStorage.setItem('tarefas', JSON.stringify(tarefas));
        }

    //cria nova tarefa e joga no array para exibir na tela
        handleSubmit=(e)=>{
            e.preventDefault();
            const{ tarefas, index } = this.state;
            let {novaTarefa} = this.state;
            novaTarefa = novaTarefa.trim();

            if (tarefas.indexOf(novaTarefa) !== -1)
                return;
            const novasTarefas = [...tarefas];
            if(index === -1){
                //cria nova tarefa
                this.setState({
                    tarefas: [...novasTarefas, novaTarefa],
                    novaTarefa: '',
                });
            } else {
                //edita tarefa
                novasTarefas[index] = novaTarefa;
                this.setState({
                    tarefas: [...novasTarefas],
                    index: -1,
                });
            }
        }
        handleEdit = (e, index) => {
            const {tarefas} = this.state;

            this.setState({
                index,
                novaTarefa: tarefas[index],
            });
        }

        handleDelete = (e, index) => {
            const {tarefas} = this.state;
            const novasTarefas = [...tarefas];
            novasTarefas.splice(index, 1);

            this.setState({
                tarefas: [...novasTarefas],
            });
        }
    
        handleChange= (e) => {
            this.setState({
                novaTarefa: e.target.value,
            });
        }

    render(){
        const { novaTarefa, tarefas } = this.state;

        return (

        <div className="main">
            <h1>Lista de tarefas</h1>
            <Form
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                novaTarefa={novaTarefa}
            />
            <Tarefas
            tarefas={tarefas}
                handleEdit={this.handleEdit}
                handleDelete={this.handleDelete}

            />


        </div>
        );
    }
}
