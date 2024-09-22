a = int(input("Enter the number: "))
num_str = str(a)
sum = 0
num_digits = len(num_str)

for digit in num_str:
    sum += int(digit) ** num_digits

if a == sum:
    print(f"{a} is an Armstrong number")
else:
    print(f"{a} is not an Armstrong number")
