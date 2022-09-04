#include <bits/stdc++.h>

using namespace std;

int main() {
    char m[200];
    int temp = 1, current;
    string crypto = "";
    cin >> m;
    current = m[0];
    if (strlen(m) == 1) crypto = "1" + to_string((int) m[0] - 48);
    else {
        for (int i = 1; i < strlen(m); i++) {
            if (m[i] == current) {
                temp++;
            } else {
                crypto = crypto + to_string(temp) + to_string((int) current - 48);
                current = m[i];
                temp = 1;
            }
            if (i == strlen(m) - 1) crypto = crypto + to_string(temp) + to_string((int) current - 48);
        }
    }
    cout << crypto;
}
