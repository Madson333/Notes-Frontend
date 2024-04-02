import { Container, Brand, Menu, Search, Content, NewNote } from "./styles"
import { Header } from "../../components/header"
import { ButtonText } from "../../components/buttonText"
import { Input } from "../../components/input"
import { Note } from "../../components/note"
import { Section } from "../../components/section"
import { FiPlus } from "react-icons/fi"
import { useState, useEffect } from "react"
import { api } from "../../services/api"
import { useNavigate } from "react-router-dom"

export function Home() {
  const [tags, setTags] = useState([])
  const [tagsSelected, setTagsSelected] = useState([])
  const [search, setSearch] = useState("")
  const [notes, setNotes] = useState([])

  const navigate = useNavigate()

  function handleTagsSelected(tagName) {
    if (tagName === "all") {
      return setTagsSelected([])
    }


    const alreadySelected = tagsSelected.includes(tagName)

    if (alreadySelected) {
      const filteredTags = tagsSelected.filter(tag => tag != tagName)
      setTagsSelected(filteredTags)
    } else {
      setTagsSelected(state => [...state, tagName])
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`)
  }

  useEffect(() => {
    async function fetchTags() {
      const response = await api.get("/tags")
      setTags(response.data)
    }

    fetchTags()
  }, [])

  useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`)
      console.log(response.data)
      setNotes(response.data)
    }

    fetchNotes()
  }, [tagsSelected, search])

  return (
    <Container>
      <Brand>
        <h1>Notes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
            title="Todos"
            $isactive={tagsSelected.length === 0}
            onClick={() => handleTagsSelected("all")}
          />
        </li>
        {
          tags && tags.map((tag) => (
            <li
              key={String(tag.id)}
            >
              <ButtonText
                title={tag.name}
                onClick={() => handleTagsSelected(tag.name)}
                $isactive={tagsSelected.includes(tag.name)}
              />
            </li>
          ))
        }
      </Menu>

      <Search>
        <Input
          placeholder="Pesquisar pelo titulo"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas" >
          {
            notes.map((note) => (
              <Note
                key={note.id}
                data={note}
                onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>

      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  )
}