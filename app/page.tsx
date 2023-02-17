"use client";

import { useState } from "react";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Badge,
  HStack,
} from "@chakra-ui/react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");

  const handleAdd = () => {
    setTodos([...todos, { id: Date.now(), title: title, completed: false }]);
    setTitle("");
  };

  const handleToggle = (id: number) => {
    let newTodoList = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(newTodoList);
  };

  const handleClearCompleted = () => {
    let newTodoList = todos.filter((todo) => !todo.completed);
    setTodos(newTodoList);
  };

  return (
    <>
      <Flex minH={"100vh"} align={"center"} justify={"center"} bg="#CBD5E0">
        <Stack
          spacing={10}
          w={"full"}
          maxW={"md"}
          py="32px"
          px="10px"
          my={2}
          bg="#CBD5E0"
        >
          <Heading
            color="black"
            lineHeight={1.1}
            fontSize={"36px"}
            fontWeight="bold"
          >
            Create a Todo ({todos.length})
          </Heading>

          <Text fontSize={"20px"} fontWeight="bold" color="black">
            Write things here so you don't forget
          </Text>
          <HStack>
            <FormControl id="email">
              <Input
                borderRadius={8}
                boxShadow="lg"
                color="teal"
                fontSize={"16px"}
                fontWeight="bold"
                width="200px"
                height="32px"
                placeholder="Do Homework"
                _placeholder={{ color: "inherit" }}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormControl>
            <Stack spacing={"16px"}>
              <Button
                borderRadius={8}
                boxShadow="lg"
                height="36px"
                bg={"blue.400"}
                color={"red.800"}
                fontWeight={"bold"}
                fontSize={"16px"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => handleAdd()}
                disabled={title.length === 60}
              >
                Add Todo
              </Button>
            </Stack>
          </HStack>
          <Stack>
            <ul style={{ fontSize: "20px", fontWeight: "normal" }}>
              {todos.map((todo) => (
                <li style={{ margin: "8px" }} key={todo.id}>
                  {todo.title}--{" "}
                  <Badge
                    fontSize="20px"
                    fontWeight={"bold"}
                    color={todo.completed ? "green" : "red"}
                  >
                    {todo.completed ? "completed" : "incomplete"}
                  </Badge>
                  <Button
                    borderRadius={8}
                    boxShadow="lg"
                    marginX={"5"}
                    size={"md"}
                    fontSize={"16px"}
                    fontWeight={"bold"}
                    color="red.300"
                    onClick={() => handleToggle(todo.id)}
                  >
                    Toggle
                  </Button>
                </li>
              ))}
            </ul>

            <Button
              borderRadius={8}
              boxShadow="lg"
              height="36px"
              width="200px"
              px="10px"
              bg="green"
              color={"white"}
              fontSize={"20px"}
              fontWeight={"bold"}
              onClick={() => handleClearCompleted()}
            >
              Clear All Completed
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  );
}
