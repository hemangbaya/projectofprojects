group 'org.aj3douglas'
version '1.0.0'

repositories { mavenCentral() }

// See https://github.com/JetBrains/gradle-intellij-plugin/
intellij {
    pluginName = project.name
    version '2020.2.3'
    type 'IJ'
    downloadSources true
}
patchPluginXml {
    changeNotes """"""
}

class a{
    int i;
    char a;
}

a obj[5];
obj.i=1;
obj.a='a';

for (i=0;i<5;i++){
    obj[i].i=1;
    obj[i].a='a';
}

for (i=0;i<5;i++) {
    for (int j=0;j<5;j++) {
        print("a");
        prin0t("b");
        print("c");
    }
}