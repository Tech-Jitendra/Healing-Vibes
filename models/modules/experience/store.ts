/* eslint-disable require-yield */
/* eslint-disable func-names */
import { types, flow } from 'mobx-state-tree';
import * as Schema from './schema';
import { withEnvironment } from '../../extensions/with-environment';

export const ExperienceStore = types
    .model({
        experienceCardData: types.array(Schema.CardData),
    })
    .extend(withEnvironment)
    .actions((self) => ({
        addExperienceCard: flow(function* (newCardData) { // Pass newCardData as a parameter
            return self.experienceCardData.push(newCardData); // Assuming newCardData is a valid object
        }),
        getFilteredExperienceCard: flow(function* (searchText) { //returning an array of filteredData
            return self.experienceCardData.filter(card => {
                const cardString = [card.comments, card.datePosted, card.description, card.title, card.userHandle, card.userName].join(' ');
                // const boolIncludes =
                if (cardString.toLowerCase().includes(searchText.toLowerCase()))
                    return card
            });
        }),

    }));
