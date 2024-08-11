import styled from "styled-components"
import StyledForm from "../../ui/StyledForm"
import Button from "../../ui/Button"
import AnimatedLink from "../../ui/AnimatedLink"
import { FaArrowRightToBracket } from "react-icons/fa6";

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


`

function Discussions() {
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
                <input placeholder="Search a topic by title..." className="search__input search-input" type="text" />
                <Button size="small">Create a topic</Button>
            </form>
        </header>
        <section className="topics">
            <ul className="topics__list">
                <li>
                    <article className="topic">
                        <h2 className="topic__title">What was your favorite lecture so far?</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >John Doe</span></p>
                            <p>Total messages: <span className="topic__subheading">37</span></p>
                            <p>Created: <span className="topic__subheading">2022-01-01</span></p>
                            <p>Last updated: <span className="topic__subheading">2022-01-01</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus non ultricies commodo, neque mauris tincidunt velit, vel aliquet enim nunc ac turpis. Aliquam erat volutpat. Donec vel neque vel felis lobortis vulputate.</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium">
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
                <li>
                    <article className="topic">
                        <h2 className="topic__title">What was your favorite lecture so far?</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >John Doe</span></p>
                            <p>Total messages: <span className="topic__subheading">37</span></p>
                            <p>Created: <span className="topic__subheading">2022-01-01</span></p>
                            <p>Last updated: <span className="topic__subheading">2022-01-01</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus non ultricies commodo, neque mauris tincidunt velit, vel aliquet enim nunc ac turpis. Aliquam erat volutpat. Donec vel neque vel felis lobortis vulputate.</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium">
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
                <li>
                    <article className="topic">
                        <h2 className="topic__title">What was your favorite lecture so far?</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >John Doe</span></p>
                            <p>Total messages: <span className="topic__subheading">37</span></p>
                            <p>Created: <span className="topic__subheading">2022-01-01</span></p>
                            <p>Last updated: <span className="topic__subheading">2022-01-01</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus non ultricies commodo, neque mauris tincidunt velit, vel aliquet enim nunc ac turpis. Aliquam erat volutpat. Donec vel neque vel felis lobortis vulputate.</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium">
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
                <li>
                    <article className="topic">
                        <h2 className="topic__title">What was your favorite lecture so far?</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >John Doe</span></p>
                            <p>Total messages: <span className="topic__subheading">37</span></p>
                            <p>Created: <span className="topic__subheading">2022-01-01</span></p>
                            <p>Last updated: <span className="topic__subheading">2022-01-01</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus non ultricies commodo, neque mauris tincidunt velit, vel aliquet enim nunc ac turpis. Aliquam erat volutpat. Donec vel neque vel felis lobortis vulputate.</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium">
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
                <li>
                    <article className="topic">
                        <h2 className="topic__title">What was your favorite lecture so far?</h2>
                        <div className="topic__stats">
                            <p>Author: <span className="topic__subheading" >John Doe</span></p>
                            <p>Total messages: <span className="topic__subheading">37</span></p>
                            <p>Created: <span className="topic__subheading">2022-01-01</span></p>
                            <p>Last updated: <span className="topic__subheading">2022-01-01</span></p>
                        </div>
                        <p className="topic__description"><span className="topic__subheading">Discussion:</span> <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus non ultricies commodo, neque mauris tincidunt velit, vel aliquet enim nunc ac turpis. Aliquam erat volutpat. Donec vel neque vel felis lobortis vulputate.</span></p>
                        <p className="topic__link">
                            <AnimatedLink size="medium">
                                Open the topic <span className="topic__icon"><FaArrowRightToBracket/></span>
                            </AnimatedLink>
                        </p>
                    </article>
                </li>
            </ul>
        </section>
   </StyledDiscussions>
}

export default Discussions;
