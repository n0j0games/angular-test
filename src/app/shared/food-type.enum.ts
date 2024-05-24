export enum FoodType {
    BREAKFAST = 'Breakfast',
    SOUP = 'Soup',
    STARTER = 'Starter',
    LUNCH = 'Lunch',
    DINNER = 'Dinner',
    SNACK = 'Snack',
    DESSERT = 'Dessert'
}

export function getFoodIcon(foodType : FoodType) {
    switch (foodType) {
        case FoodType.BREAKFAST: return 'fa-solid fa-mug-saucer'
        case FoodType.SOUP: return 'fa-solid fa-bowl-food'
        case FoodType.STARTER: return 'fa-solid fa-bowl-rice'
        case FoodType.LUNCH: return 'fa-solid fa-burger'
        case FoodType.DINNER: return 'fa-solid fa-utensils'
        case FoodType.SNACK: return 'fa-solid fa-apple-whole'
        case FoodType.DESSERT: return 'fa-solid fa-ice-cream'
    }
}
