VERSION=unknown

STAGING_DIR=/srv/preware/build/staging/i686
CC=/srv/preware/build/toolchain/i686-unknown-linux-gnu/build/i686-unknown-linux-gnu/bin/i686-unknown-linux-gnu-gcc

# STAGING_DIR=/srv/preware/build/staging/armv7
# CC=/opt/PalmPDK/arm-gcc/bin/arm-none-linux-gnueabi-gcc

CPPFLAGS := -g -DVERSION=\"${VERSION}\" -I${STAGING_DIR}/usr/include/glib-2.0 -I${STAGING_DIR}/usr/lib/glib-2.0/include -I${STAGING_DIR}/usr/include
LDFLAGS  := -g -L${STAGING_DIR}/usr/lib -llunaservice -lmjson -lglib-2.0

ledmanager: ledmanager.o luna_service.o luna_methods.o

install: ledmanager
	- ssh root@webos killall org.webosinternals.ledmanager
	scp ledmanager root@webos:/var/usr/sbin/org.webosinternals.ledmanager.new
	ssh root@webos mv /var/usr/sbin/org.webosinternals.ledmanager.new /var/usr/sbin/org.webosinternals.ledmanager

clobber:
	rm -rf *.o ledmanager
