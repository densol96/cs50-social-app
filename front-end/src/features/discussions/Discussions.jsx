import styled from "styled-components"
import StyledForm from "../../ui/StyledForm"
import Button from "../../ui/Button"
import AnimatedLink from "../../ui/AnimatedLink"
import { FaArrowRightToBracket } from "react-icons/fa6";
import {getAllDiscussions, getAllDiscussionsPageNum} from "../../services/discussionsApi";
import { useLoaderData } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/Spinner";
import { useEffect, useState } from "react";

const StyledDiscussions = styled.div`

    display: flex;
    flex-direction: column;
    gap: 4.8rem;

    .header {
        display: flex;
        flex-direction: column;
        gap:3rem;

        
        .stats {
            padding: 0 0 3rem;
            position: relative;
            margin-top: 3rem;

            &::after {
                position: absolute;
                content: "";
                height: 2px;
                width: 30rem;
                background-color: var(--color-white);
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }

            &__heading {
                margin-bottom: var(--spacing-s);
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            .users {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                gap: 1rem;
                justify-content: center;
            }
        }

        .search {
            display: flex;
            justify-content: space-between;

            &__input {
                color: var(--color-grey);
                font-size: 1.8rem;
                width: 30rem;
            }
        }   
    }

    .topics {
        &__list {
            display: flex;
            flex-direction: column;
            gap: 5rem;
        }

        .topic {

            background-color: var(--color-grey);

            display: flex;
            flex-direction: column;
            gap: 2rem;

            padding: 3rem;
            border-radius: 7px;

            box-shadow: var(--shadow-dark--light);

            &__stats {
                display: grid;
                grid-template-columns: 1fr 1fr;    
            }

            &__subheading {
                font-weight: 700;
            }

            &__link {
                text-transform: uppercase;
                display: flex;
                align-self: center;
                gap: 2rem;
            }

            &__icon {
                margin-left: .5rem;
                display: flex;
                align-items: center;
            }
        }
    }

    .loader {
        text-align: center;
        margin-top: 3rem;
    }
`

function proccessTimestamp(timestamp){
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toTimeString().slice(0, 5)}`;
}

function Discussions() {
    const {discussionsOnLoad, pagesTotal} = useLoaderData();
    const { ref, inView, entry } = useInView();
    const [currentPage, setCurrentPage] = useState(1); 
    const [discussions, setDiscussions] = useState(discussionsOnLoad);
    const [searchQuery, setSearchQuery] = useState("");

    // errorElement is catching the exceptions, no need for additional error handling in the logic
    useEffect(() => {
        if(inView) {
            (async()=> {
                const additionalDiscussions = await getAllDiscussions(currentPage + 1);
                setCurrentPage(currentPage + 1);
                setDiscussions(state => [...state, ... additionalDiscussions]);
            })();
        }
    }, [inView]);

    useEffect(()=> {
        setCurrentPage(1);
        
    }, [searchQuery]);

    return <StyledDiscussions>
        <header className="header">
            <h1 className="hidden">Discussions</h1>
            <section className="stats text-center">
                <h2 className="stats__heading">Currently logged in users {`{ 1 }`}:</h2>
                <p className="users">
                    <span>solodeni</span>
                </p>
            </section>
            <form className="search" action="">
                <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search a topic by title..." className="search__input search-input" type="text" />
                <Button size="small">Create a topic</Button>
            </form>
        </header>
        <section className="topics">
            <ul className="topics__list">
                {discussions?.length === 0 && <p>There are no any discussions at present</p> }
                {discussions?.length !== 0 && discussions.map(discussion => 
                <li key={discussion.id}>
                    <article  className="topic">
                        <h2 className="topic__title">{discussion.title}</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >{discussion.author.fullName}</span></p>
                            <p>Total messages: <span className="topic__subheading">{discussion.totalMessages}</span></p>
                            <p>Created: <span className="topic__subheading">{proccessTimestamp(discussion.createdAt)}</span></p>
                            <p>Last updated: <span className="topic__subheading">{proccessTimestamp(discussion.updatedAt)}</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>{discussion.originalPost}</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium" to={`/app/discussions/${discussion.id}`}>
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
                )}
            </ul>
            {currentPage < pagesTotal && <div ref={ref} className="loader"><Spinner  /></div>}
            
        </section>
   </StyledDiscussions>
}

export default Discussions;

export function loader() {
    const page = 1;
    return Promise.all([getAllDiscussions(page), getAllDiscussionsPageNum()]).then(data => {
        const [discussionsOnLoad, pagesTotal] = data;
        return { discussionsOnLoad, pagesTotal };
    });
}