#!/usr/bin/env python3
""" 5. LFU caching """


from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ Least Frequently used Strategy """

    def __init__(self):
        """ This is the constructor """
        super().__init__()

    def put(self, key, item):
        """ Add an item in the cache """
        if key is not None and item is not None:
            self.cache_data[key] = item
            if len(self.cache_data) > BaseCaching.MAX_ITEMS:
                Least_used = next(iter(self.cache_data))
                print("DISCARD: {}".format(Least_used))
                del self.cache_data[Least_used]

    def get(self, key):
        """ Get an item by key """
        if key in self.cache_data:
            most_recently = self.cache_data[key]
            del self.cache_data[key]
            self.cache_data[key] = most_recently
        return self.cache_data.get(key)
