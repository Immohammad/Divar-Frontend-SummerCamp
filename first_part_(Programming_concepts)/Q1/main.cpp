#include <bits/stdc++.h>

using namespace std;

int main() {
    int m, sum = 0, temp;
    cin >> m; //receive number of rows and columns of the square matrix
    for (int i = 0; i < m; i++) { //iterate rows
        for (int j = 0; j < m; j++) { //iterate columns
            cin >> temp; //receive matrix's element
            if ((i == j || i + j == m - 1) && (temp % 3 == 1)) sum += temp; //check it is in main diameter and is 3k+1
            if (m % 2 != 0 && i == (m - 1) / 2 && j == i && (temp % 3 == 1)) sum += temp; //check it is in main subdiameter and is 3k+1
        }
    }
    cout << sum;
}