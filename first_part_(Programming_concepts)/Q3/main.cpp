#include <bits/stdc++.h>

using namespace std;

bool isNumber(int x) {
    if (x >= 48 && x <= 57) {
        return true;
    }
    return false;
}

bool isPrime(int n) {
    if (n <= 9)
        return false;
    for (int i = 2; i < n; i++)
        if (n % i == 0)
            return false;
    return true;
}

int main() {
    char m[200];
    int number=0;
    cin >> m;
    for (int i = 0; i < strlen(m) - 1; i++) {
        if (isNumber((int) m[i]) && isNumber((int) m[i + 1])) {
            number = ((int) m[i] - 48) * 10 + ((int) m[i + 1]-48);
            if (isPrime(number)) cout << number << endl;
        }
    }
}
