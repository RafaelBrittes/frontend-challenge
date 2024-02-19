import { useEffect, useState } from 'react';
import { PlusCircle } from "@phosphor-icons/react";
import { Button, ButtonProps } from "../Button/Button";
import { addTheme, deleteTheme, saveTheme } from "../Button/Button.styles";
import { NewTaskContainer, InputContainer } from "./NewTask.styles";
import { toast } from 'react-toastify';

interface NewTaskProps {
    addNewTask: (taskText: string) => void;
    isFilterActive?: boolean;
}

export function NewTask({ addNewTask, isFilterActive }: NewTaskProps) {
    const [inputValue, setInputValue] = useState('');
    const [buttonTheme, setButtonTheme] = useState<ButtonProps>({ theme: addTheme });

    const createdTaskToast = () => toast.success('New task created!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    const errorTaskToast = () => toast.error('Error! Please insert an task title.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        setInputValue(event.target.value);
    }

    function handleAddTask() {
        if (inputValue.trim() !== '' && !isFilterActive) {
            addNewTask(inputValue);
            setInputValue('');
            setButtonTheme({ theme: saveTheme });
            createdTaskToast();
            setTimeout(() => {
                setButtonTheme({ theme: addTheme });
            }, 1000);
        } else {
            errorTaskToast();
            setButtonTheme({ theme: { ...deleteTheme, radius: '0px 4px 4px 0px' } });
            setTimeout(() => {
                setButtonTheme({ theme: addTheme });
            }, 1000);
        }
    }

    useEffect(() => {
        if (isFilterActive) {
            setInputValue('');
            setButtonTheme({ theme: addTheme });
        }
    }, [isFilterActive]);

    return (
        <NewTaskContainer>
            <InputContainer>
                <input
                    data-cy="newItemInput"
                    type="text"
                    placeholder="Add new item..."
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={isFilterActive}
                />
                <Button
                    data-cy="addNewItemButton"
                    onButtonClick={handleAddTask}
                    theme={buttonTheme.theme} // Acesso direto ao atributo theme
                    disabled={isFilterActive}
                >
                    <PlusCircle size={25} weight="fill" />
                </Button>
            </InputContainer>
        </NewTaskContainer>
    )
}