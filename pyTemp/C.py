import time

class Heap:
    def __init__(self):
        self.items = dict()     # key - value
        self.indexes = []       # keys


    # Usefull functions
    def swap(self, i, j):
        temp = self.indexes[i]
        self.indexes[i] = self.indexes[j]
        self.indexes[j] = temp

    def bigger(self, i, j):
        if self.indexes[i] <= self.indexes[j]:
            return False
        else:
            return True


    # Check family UwU
    def hasParent(self, i):
        if (i - 1)/2 >= 0:
            return True
        return False
    def parentIndex(self, i):
        return int((i - 1)/2)

    def hasLeft(self, i):
        if i*2 + 1 < len(self.indexes):
            return True
        return False
    def leftIndex(self, i):
        return int(i*2 + 1)

    def hasRight(self, i):
        if i*2 + 2 < len(self.indexes):
            return True
        return False
    def rightIndex(self, i):
        return int(i*2 + 2)


    # heapifys
    def heapifyUp(self, i=None):
        if i:
            index = i
        else:
            index = len(self.indexes) - 1

        while self.hasParent(index) and self.bigger(self.parentIndex(index), index):
            self.swap(self.parentIndex(index), index)
            index = self.parentIndex(index)


    def heapifyDown(self, i=0):
        index = i
        while self.hasLeft(index):
            smaller = self.leftIndex(index)
            if self.hasRight(index) and self.bigger(self.leftIndex(index), self.rightIndex(index)):
                smaller = self.rightIndex(index)

            if self.bigger(smaller, index):
                break
            else:
                self.swap(index, smaller)

            index = smaller


    # all needed methods
    def add(self, key, data):
        if self.items.get(key, None):
            raise(Exception)

        self.items[key] = (data, len(self.indexes))
        self.indexes.append(key)
        self.heapifyUp()

    def set(self, key, data):
        if not self.items.get(key, None):
            raise(Exception)

        self.items[key][0] = data

    def delete(self, key):
        temp = self.items.get(key, None)
        if not temp:
            raise(Exception)

        del self.items[key]

        self.indexes[temp[1]] = self.indexes[-1]
        self.indexes.pop()
        if i < len(self.indexes):   # dont heapify if deleted last element
            self.heapifyDown(i=i)
            self.heapifyUp(i=i)
        return

# add 1 1
# add 2 2
# add 3 3
# add 4 4
# add 5 5
# add 6 6
# add 7 7
# add 8 8
# add 9 9
# add 10 10
# add 11 11
# add 12 12
# add 13 13
# add 14 14
# add 15 15
# print


    def search(self, key):
        value = self.items.get(key, None)
        if value:
            print('1', value[1], value[0])
        else:
            print('0')

    def min(self):
        if len(self.indexes) == 0:
            raise(Exception)

        key = self.indexes[0]
        print(key, '0', self.items[key])

    def max(self):
        if len(self.indexes) == 0:
            raise(Exception)

        i = int(len(self.indexes)/2)
        maxKey = self.indexes[i]

        index = i
        while i < len(self.indexes):
            if maxKey < self.indexes[i]:
                maxKey = self.indexes[i]
                index = i
            i += 1
        print(maxKey, index, self.items[maxKey])

    def extract(self):
        if len(self.indexes) == 0:
            raise(Exception)

        rootKey = self.indexes[0]
        rootData = self.items[rootKey]
        del self.items[rootKey]

        if len(self.indexes) > 1:
            self.indexes[0] = self.indexes.pop()
            self.heapifyDown()
        else:
            self.indexes.pop()

        print(rootKey, rootData)

    def print(self):
        height = 0
        index = 0
        out = ''

        i = 0
        if len(self.indexes) == 0:
            print('_')
            return

        while i < len(self.indexes):
            lineLen = 1 << height
            index += 1
            key = self.indexes[i]
            out += '[' + str(key) + ' ' + self.items[key][0]
            if height != 0:
                out += ' ' + str(self.indexes[self.parentIndex(i)])

            out += ']'

            if index == lineLen:
                out += '\n'
                index = 0
                height += 1
            else:
                out += ' '
            i += 1

        if index != 0 and index < lineLen:
            out += '_ ' * (lineLen - index)
            print(out[0:-1])
        else:
            print(out, end='')


cycle = True
heap = Heap()
start = time.time()
inp = open('in.txt')
for line in inp:
# while cycle:
    try:
        # line = input()
        cmd = line.split(' ', 2)

        try:
            if len(cmd) == 1 and cmd[0] == '':
                continue

            if len(cmd) == 2 and cmd[0] == '' and cmd[1] == '':
                continue

            if cmd[0] == 'add':
                heap.add(int(cmd[1]), cmd[2])

            elif cmd[0] == 'set':
                heap.set(int(cmd[1]), cmd[2])

            elif cmd[0] == 'delete':
                heap.delete(int(cmd[1]))

            elif cmd[0] == 'search':
                heap.search(int(cmd[1]))

            elif cmd[0] == 'min':
                heap.min()

            elif cmd[0] == 'max':
                heap.max()

            elif cmd[0] == 'extract':
                heap.extract()

            elif cmd[0] == 'print':
                heap.print()

            else:
                raise(Exception)

        except Exception:
                print('error')
                continue

    except Exception:
        cycle = False

print("--- %s seconds ---" % (time.time() - start))
