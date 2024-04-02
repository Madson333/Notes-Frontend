import { Button } from "../../components/button"
import { Header } from "../../components/header"
import { Section } from "../../components/section"
import { Tag } from "../../components/tag"
import { Container, Links, Content } from "./styles"
import { ButtonText } from "../../components/buttonText"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../services/api"

export function Details() {
  const [data, setData] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  function handleBack() {
    navigate(-1)
  }

  async function handleRemove() {
    const comfirm = window.confirm("Deseja realmente remover essa nota?")

    if (confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

  useEffect(() => {
    async function fetchNote() {
      const response = await api.get(`/notes/${params.id}`)
      setData(response.data)
    }

    fetchNote()
  }, [])

  return (
    <Container>
      <Header />
      {
        data &&
        <main>
          <Content>
            <ButtonText
              title="Excluir nota"
              onClick={handleRemove}
            />

            <h1>{data.title}</h1>

            <p>
              {data.description}
            </p>
            {
              data.links &&
              <Section title="Links últeis">
                <Links>
                  {
                    data.links.map(link => (
                      <li key={link.id} >
                        <a
                          href={link.url}
                          target="_blank"
                        >
                          {link.url}
                        </a>
                      </li>
                    ))
                  }


                </Links>
              </Section>
            }
            {
              data.tags &&
              <Section title="Marcadores">
                {
                  data.tags.map(tag => (
                    <Tag key={tag.id} title={tag.name} />
                  ))
                }
              </Section>
            }

            <Button title="Voltar" onClick={handleBack} />

          </Content>
        </main>
      }
    </Container>



  )
}


