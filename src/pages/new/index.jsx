import { useState } from 'react'
import { Container, Form } from './styles'
import { Header } from "../../components/header"
import { Input } from "../../components/input"
import { Textarea } from "../../components/textarea"
import { NoteItem } from "../../components/noteitem"
import { Section } from "../../components/section"
import { Button } from "../../components/button"
import { Link } from "react-router-dom"
import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

export function New() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [links, setLinks] = useState([])
  const [newLink, setNewLink] = useState("")

  const [tags, setTags] = useState([])
  const [newTag, setNewTag] = useState("")

  const navigate = useNavigate()

  function handleAddLink() {
    setLinks(state => [...state, newLink])
  }

  function handleRemoveLink(deleted) {
    setLinks(prevState => prevState.filter((link, index) => index !== deleted))
  }

  function handleAddTag() {
    setTags(state => [...state, newTag])
  }

  function handleRemoveTag(deleted) {
    setTags(prevState => prevState.filter((tag, index) => index !== deleted))
  }

  async function handleNewNote() {
    if (!title) {
      return alert("Digite o título da nota.")
    }

    if (newLink) {
      return alert("Você deixou um link no campo para adicionar, mas não adicionou.")
    }


    if (newTag) {
      return alert("Você deixou um marcador no campo para adicionar, mas não adicionou.")
    }


    await api.post("/notes", {
      title,
      description,
      tags,
      links
    })

    alert("nota enviada com sucesso!")
    navigate(-1)
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar nota</h1>
            <Link to="/">voltar</Link>
          </header>

          <Input
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
          />

          <Section title="Links úteis" >
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value={link}
                  onClick={() => handleRemoveLink(index)}
                />
              ))
            }
            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={e => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>

          <Section title="Marcadores" >
            <div className="tags" >
              {
                tags.map((tag, index) => (
                  <NoteItem
                    key={String(index)}
                    value={tag}
                    onClick={() => { handleRemoveTag(index) }}
                  />
                ))
              }

              <NoteItem
                placeholder="Nova tag"
                isNew
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  )
}