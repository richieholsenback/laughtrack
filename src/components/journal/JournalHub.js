import React, { useContext, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../user/UserProvider"
import "./performances/Journal.css"
import "./ideas/Idea.css"
import { JournalContext } from "./performances/JournalProvider"
import { JournalCard } from "./performances/JournalCard"
import { IdeaCard } from "./ideas/IdeaCard"
import { IdeaContext } from "./ideas/IdeaProvider"

export const JournalHub = () => {
    // This state changes when `getAnimals()` is invoked below
    const { journals, getJournals } = useContext(JournalContext)
    const { ideas, getIdeas } = useContext(IdeaContext)

    //useEffect - reach out to the world for something
    useEffect(() => {
        getJournals()
        getIdeas()
    }, [])

    const history = useHistory()

    const journalShow = ((entry) => {
        
        if (entry.hidden === true && entry.userId !== parseInt(sessionStorage.getItem("active_user"))){
            return null
        } else {
            return <JournalCard key={entry.id} journal={entry} />
        }

    })

    const ideaShow = ((entry) => {
        
        if (entry.hidden === true && entry.userId !== parseInt(sessionStorage.getItem("active_user"))){
            return null
        } else {
            return <IdeaCard key={entry.id} idea={entry} />
        }

    })

    const myJokePerformances = journals.filter(performance => {
        if (performance.userId === parseInt(sessionStorage.getItem("active_user"))){
        return performance
    }
    })

    const myJokeIdeas = ideas.filter(idea => {
        if (idea.userId === parseInt(sessionStorage.getItem("active_user"))){
            return idea
        }
    })

    return (
        <>
        <div className="journals">
            <div className="journalSelect">
                <div class="spacer"></div>
                <Link to="/journals/performances" className="journalLinkText">Performances</Link>
                <br></br>
                <Link to="/journals/ideas" className="journalLinkText">Ideas</Link>
                <div class="spacer"></div>
            </div>
            <br></br>
            <h3 class="journalSection">Joke Performances</h3>
            {
                myJokePerformances.map(journal => {
                    return journalShow(journal) 
                })
            }
        </div>
        <div className="ideas">
        {/* {console.log("IdeaList: Render")} */}
        <h3 class="journalSection">Joke Ideas</h3>
        {
            myJokeIdeas.map(idea => {
                return ideaShow(idea)  
            })
        }
    </div>
    </>
    )
}