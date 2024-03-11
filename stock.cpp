#include <iostream>

int calculateTotalCost(int price, int quantity) {
    return price * quantity;
}

int main() {
    int itemPrice = 1000; // Price of each item
    int itemCount = 10000; // Number of items to purchase

    int totalCost = calculateTotalCost(itemPrice, itemCount);

    std::cout << "Total cost: " << totalCost << std::endl;

    return 0;
}
